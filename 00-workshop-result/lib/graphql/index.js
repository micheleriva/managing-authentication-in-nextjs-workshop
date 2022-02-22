import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  "https://managing-auth-workshop.herokuapp.com/v1/graphql"
);

export default client;
