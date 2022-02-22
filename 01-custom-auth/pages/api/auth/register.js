import bcrypt from 'bcrypt';
import { gql } from 'graphql-request';
import graphql from '../../../lib/graphql';

const INSERT_USER_MUTATION = gql`
  mutation InsertUser($email: String!, $password: String!) {
    insert_user_one(object: {email: $email, password: $password}) {
      id
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

  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);

  const insertRequest = await graphql.request(INSERT_USER_MUTATION, {
    email,
    password: hashed
  });

  res.json({
    id: insertRequest.insert_user_one.id
  });
}