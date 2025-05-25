import ContactForm from "../../components/contact/ContatctForm";

const Contact: React.FC = () => {
  return (
    <div className="text-white pt-25 lg:pt-20 min-h-[80vh] lg:px-5 ">
      <div className="flex flex-col lg:flex-row gap-10">
        <section className="lg:w-1/2 flex flex-col p-2 gap-3 ">
          <h1 className="text-4xl lg:text-5xl font-bold mb-10 text-center lg:text-left">
            Kontakt
          </h1>
          <h2 className="text-2xl font-semibold mb-4">Dane kontaktowe</h2>
          <p className="text-lg mb-2">Email: kontakt@movieworld.pl</p>
          <p className="text-lg mb-2">Telefon: +48 123 456 789</p>
          <p className="text-lg">Adres: ul. Filmowa 10, 00-000 Warszawa</p>

          <div className="mt-10 pt-6 flex flex-col items-center border border-primary shadow-highlight-glow p-5 rounded-xl lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-3">Znajdź nas</h2>
            <div className="flex gap-5 text-4xl">
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
        </section>

        <section className="lg:w-1/2 px-1">
          <h2 className="text-2xl font-semibold mb-4">Napisz do nas</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
};

export default Contact;
