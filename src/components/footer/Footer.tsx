const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-[3rem] w-full border-t border-primary py-4 text-center text-sm text-gray-400">
      © {year} Wykonał Michał Bukowski
    </footer>
  );
};

export default Footer;
