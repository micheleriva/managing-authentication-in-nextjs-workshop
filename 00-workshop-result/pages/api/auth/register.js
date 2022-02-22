import bcrypt from 'bcrypt';
import { gql } from 'graphql-request';
import graphql from '../../../lib/graphql';

const USER_EXISTS = gql`
  query UserExists($email: String!) {
    user_aggregate(where: {email: {_eq: $email}}) {
      aggregate {
        count
      }
    }
  }
`;

const INSERT_USER = gql`
  mutation InsertUser($email:String!, $password:String!) {
    insert_user_one(object: {email: $email, password: $password}) {
      id
    }
  }
`;

async function userExists(email) {
  const { user_aggregate } = await graphql.request(USER_EXISTS, {
    email
  });

  return Boolean(user_aggregate.aggregate.count);
}

async function insertUser(email, password) {
  const { insert_user_one } = await graphql.request(INSERT_USER, {
    email,
    password
  });

  return insert_user_one.id;
}

function validatePassword(psw) {
  if (psw.length < 6) return false;
  return true;
}

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422);
    res.json({
      success: false,
      message: 'Missing required parameter'
    });
    return
  }

  if (!validatePassword(password)) {
    res.status(422);
    res.json({
      success: false,
      message: 'Password is too short'
    });
    return
  }

  if (await userExists(email)) {
    res.status(422);
    res.json({
      success: false,
      message: 'User already exists'
    });
    return
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const userId = await insertUser(email, hashed);

  res.json({
    success: true,
    id: userId
  });

}
