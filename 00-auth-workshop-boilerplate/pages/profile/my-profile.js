import { useEffect, useState } from "react";

export default function recentOrders() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    fetch("/api/profile?id=1")
      .then((data) => data.json())
      .then((data) => setProfile(data.user))
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
