import { NavLink } from "react-router-dom";

export default function JoinButton() {
  return (
    <NavLink
      to="/join"
      className="p-2 px-5 cursor-pointer bg-gradient bg-main-gradient text-lg lg:text-md xl:text-lg text-white rounded-lg inline-block"
    >
      Join
    </NavLink>
  );
}
