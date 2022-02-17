import Link from "next/link";

export default function Login() {
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='w-4/5 p-8 rounded-lg bg-slate-200'>
        <h1 className='text-center font-bold text-3xl'> Login </h1>
        <div className='mt-8 w-80 m-auto'>
          <input type='text' placeholder='email' className='p-2 rounded-md w-full' />
          <input type='password' placeholder='password' className='p-2 mt-4 rounded-md w-full' />
          <button className='bg-sky-900 mt-8 text-white font-bold py-2 px-4 w-full rounded-md hover:bg-sky-700'>
            Login
          </button>

          <Link href='/register' passHref>
            <button className='mt-4 text-sky-900 w-full hover:underline'>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}