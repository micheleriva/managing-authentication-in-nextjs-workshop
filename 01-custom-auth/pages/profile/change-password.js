export default function ChangePassword() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-4/5 p-8 rounded-lg bg-slate-200">
        <h1 className="text-center font-bold text-3xl"> Change password </h1>
        <div className="mt-8 w-80 m-auto">
          <input
            type="password"
            placeholder="old password"
            className="p-2 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="new password"
            className="p-2 mt-4 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="confirm new password"
            className="p-2 mt-4 rounded-md w-full"
          />
          <button className="bg-sky-900 mt-8 text-white font-bold py-2 px-4 w-full rounded-md hover:bg-sky-700">
            Change password
          </button>
        </div>
      </div>
    </div>
  );
}
