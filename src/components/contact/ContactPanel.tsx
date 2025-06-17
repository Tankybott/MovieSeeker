import ContactForm from "./ContatctForm";

export default function ContactPanel() {
  return (
    <div className="w-[98%] text-white">
      <ContactForm />
      <p className="text-lg mb-2">Email: contact@movieworld.pl</p>
      <p className="text-lg mb-2">Phone: +48 123 456 789</p>
      <p className="text-lg">Address: Filmowa St. 10, 00-000 Warsaw</p>

      <div className="mt-10 pt-6 flex flex-col items-center border border-primary shadow-highlight-glow p-5 rounded-xl lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-3">Find Us</h2>
        <div className="flex gap-7 text-4xl p-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            <i className="fi fi-brands-facebook h-auto leading-0"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors duration-300"
          >
            <i className="fi fi-brands-instagram h-auto leading-0"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
