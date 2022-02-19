import Link from "next/link";
import { FaUser } from "react-icons/fa";

export function NavBar() {
  return (
    <div className="w-full bg-cyan-900 border-b-8 border-b-orange-300 py-4">
      <div className="flex justify-between items-center w-8/12 m-auto text-white">
        <Link href="/" passHref>
          <a className="text-2xl font-bold"> ecommerce </a>
        </Link>

        <Link href="/login" passHref>
          <a className="flex justify-center">
            <FaUser className="w-6 h-6 mr-3" />
            <span className="font-bold text-lg">Login</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
