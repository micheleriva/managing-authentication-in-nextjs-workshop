import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdPassword } from "react-icons/md";
import { ImProfile } from "react-icons/im";

const sections = [
  {
    Icon: RiShoppingCart2Fill,
    name: "recent orders",
    link: "/profile/orders",
  },
  {
    Icon: MdPassword,
    name: "change password",
    link: "/profile/change-password",
  },
  {
    Icon: ImProfile,
    name: "my profile",
    link: "/profile/my-profile",
  },
];

function Section(props) {
  return (
    <Link href={props.link} passHref>
      <a className="w-full p-8 bg-gray-200 rounded-md hover:bg-gray-300">
        <div className="flex justify-center items-center">
          <props.Icon className="w-8 h-8" />
        </div>
        <div className="text-center mt-2">{props.name}</div>
      </a>
    </Link>
  );
}

export default function Profile() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {sections.map((section) => (
        <Section key={section.name} {...section} />
      ))}
    </div>
  );
}
