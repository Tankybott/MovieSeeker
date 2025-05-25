import MobileNav from "./MobileNav";
import TopNav from "./TopNav";
export interface NavItemConfig {
  title: string;
  href: string;
}

const navBarsConfig: NavItemConfig[] = [
  { title: "Home", href: "/" },
  { title: "Eksploruj", href: "/rental" },
  { title: "Kontakt", href: "/contact" },
  { title: "Ustawienia konta", href: "/manageMovies" },
  { title: "Zarządzaj filmami", href: "/manageMovies" },
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
