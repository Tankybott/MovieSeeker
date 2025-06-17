import { NavLink } from "react-router-dom";
import { NavItemConfig } from "./Nav";
import SignInButton from "./JoinButton";
import Logo from "../utility/Logo";

const TopNav: React.FC<{ navItems: NavItemConfig[] }> = ({ navItems }) => {
  return (
    <div className="hidden lg:flex justify-between items-center w-full text-white mt-5 p-2">
      <Logo tailwindTextSize="text-3xl" />

      <nav className="flex gap-6 items-center">
        {navItems.map((nav, index) => (
          <NavLink
            key={index}
            to={nav.href}
            className={({ isActive }) =>
              `!no-underline !text-[#C9C9C9] !text-lg ${
                isActive ? "!text-white font-bold" : " hover:!text-white"
              }`
            }
          >
            <span className="">{nav.title}</span>
          </NavLink>
        ))}
        <SignInButton />
      </nav>
    </div>
  );
};

export default TopNav;
