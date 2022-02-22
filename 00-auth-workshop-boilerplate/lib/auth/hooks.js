import { useEffect, useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const loggedIn = !loading && Object.keys(user).length;

  useEffect(() => {
    fetch('/api/auth/get-session')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUser(res.session);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [])

  return {
    loading,
    user,
    loggedIn
  }

}