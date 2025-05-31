import { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../utility/Logo";

interface MobileNavProps {
  navItems: {
    title: string;
    href: string;
  }[];
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={`lg:hidden fixed z-[9999] top-0 left-0 w-full bg-black  text-white p-4 flex justify-between items-center `}
    >
      <Logo tailwindTextSize="text-xl" />
      <Hamburger toggled={isOpen} toggle={setOpen} size={20} color="white" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[3.5rem] p-5 bg-black z-40 shadow-lg shadow-4xl"
          >
            <div className="flex h-[calc(100vh-3.5rem)] mt-0 top-0">
              <ul className="mt-[30%] sm:mt-0 md:mt-[30%] w-full flex flex-col items-center gap-4 sm:gap-7 md:gap-5">
                {navItems.map((nav, index) => (
                  <motion.li
                    key={nav.title}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.05 * index,
                    }}
                  >
                    <NavLink
                      to={nav.href}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `text-xl font-semibold ${
                          isActive ? "text-yellow-400" : "text-white"
                        }`
                      }
                    >
                      {nav.title}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
