import { useEffect, useState } from "react";
import { gql } from "graphql-request";
import client from "../../lib/graphql";

async function getProfile(userID) {
  const { user } = await client.request(gql`
    query GetUser($id: uuid!) {
      user(where: {id: {_eq: $id}}) {
        id
        name
        address
      }
    }
  `, { id: userID });

  return user.shift();
}

export default function recentOrders() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    getProfile("ff88a7aa-1f14-4f9e-a31e-99faf9ac9147")
      .then((data) => setProfile(data))
      .catch(console.log);
  }, []);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl"> {profile.name} </h1>
      <p className="mt-2 text-gray-800"> {profile.address} </p>
    </div>
  );
}
