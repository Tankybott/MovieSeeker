import MobileNav from "./MobileNav";
import TopNav from "./TopNav";
export interface NavItemConfig {
  title: string;
  href: string;
}

const navBarsConfig: NavItemConfig[] = [
  { title: "Home", href: "/" },
  { title: "Eksploruj", href: "/explore" },
  { title: "Kontakt", href: "/contact" },
  { title: "Ustawienia konta", href: "/account-settings" },
  { title: "Zarządzaj filmami", href: "/manage-content" },
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
