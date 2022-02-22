import bcrypt from 'bcrypt';
import cookie from 'cookie';
import { gql } from 'graphql-request';
import graphql from '../../../lib/graphql';
import { sign } from '../../../lib/jwt';

const GET_USER_BY_EMAIL = gql`
  query GetUser($email: String!) {
    user(where: {email: {_eq: $email}}) {
      id
      email
      password
    }
  }
`;

export default async function handler(req, res) {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    res.json({
      success: false,
      message: 'missing required data'
    });
    return;
  }

  const { user } = await graphql.request(GET_USER_BY_EMAIL, {
    email,
  });

  if (!user.length) {
    return
  }

  const myUser = user.shift();
  const isPasswordValid = await bcrypt.compare(password, myUser.password);

  if (!isPasswordValid) {
    res.status(401);
    res.json({
      success: false
    });
    return;
  }

  const JWT = sign({
    user: {
      id: myUser.id,
      email: myUser.email
    }
  });

  res.setHeader('Set-Cookie', cookie.serialize('auth', JWT, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7
  }));

  res.json({
    loggedIn: isPasswordValid
  });
}