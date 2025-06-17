import MobileNav from "./MobileNav";
import TopNav from "./TopNav";
export interface NavItemConfig {
  title: string;
  href: string;
}

const navBarsConfig: NavItemConfig[] = [
  { title: "Home", href: "/" },
  { title: "Explore", href: "/explore" },
  { title: "Account Settings", href: "/account-settings" },
  { title: "Manage Movies", href: "/manage-content" },
];

const Nav: React.FC = () => {
  return (
    <>
      <TopNav navItems={navBarsConfig} />
      <MobileNav navItems={navBarsConfig} />
    </>
  );
};

export default Nav;
