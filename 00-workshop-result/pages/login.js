import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function handleLogin() {
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
      .then((data) => {
        return data.json()
      })
      .then(({ success }) => {
        if (success) {
          router.push('/profile');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-4/5 p-8 rounded-lg bg-slate-200">
        <h1 className="text-center font-bold text-3xl"> Login </h1>
        <div className="mt-8 w-80 m-auto">
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mt-4 rounded-md w-full"
          />
          <button
            onClick={handleLogin}
            className="bg-sky-900 mt-8 text-white font-bold py-2 px-4 w-full rounded-md hover:bg-sky-700">
            Login
          </button>

          <Link href="/register" passHref>
            <button className="mt-4 text-sky-900 w-full hover:underline">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
