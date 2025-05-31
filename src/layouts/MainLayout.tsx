import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
export interface NavBarConfig {
  title: string;
  href: string;
}

const MainLayout = () => {
  return (
    <main className="w-screen flex justify-center bg-black">
      <div className="w-full md:w-[95%] xl:w-[90%] px-2 max-w-[2200px]">
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};

export default MainLayout;
