import { gql } from 'graphql-request';
import cookie from 'cookie';
import bcrypt from 'bcrypt';
import { withIronSessionApiRoute } from 'iron-session/next';
import graphql from '../../../lib/graphql';
import { sign } from '../../../lib/jwt';
import { cookieSettings } from '../../../lib/auth';

const GET_USER_BY_EMAIL = gql`
  query GetUsersByEmail($email: String!) {
    user(where: {email: {_eq: $email}}) {
      id
      name
      email
      password
    }
  }
`;

async function getUserByEmail(email) {
  const { user } = await graphql.request(GET_USER_BY_EMAIL, {
    email
  });

  return user?.[0];
}

async function handler(req, res) {
  const { email, password } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  if (!email || !password) {
    res.status(422);
    res.json({
      success: false,
      message: 'Missing required parameter'
    });
    return
  }

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(401);
    res.json({
      success: false,
      message: 'Invalid email or password'
    });
    return
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    res.status(401);
    res.json({
      success: false,
      message: 'Invalid email or password'
    });
    return
  }

  req.session.jwt = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  await req.session.save();

  res.json({
    success: true,
  });

}

export default withIronSessionApiRoute(handler, cookieSettings);