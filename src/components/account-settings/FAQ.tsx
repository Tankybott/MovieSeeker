const faqItems = [
  {
    question: "Jak mogę wypożyczyć film?",
    answer:
      "Wystarczy wybrać film, kliknąć 'Wypożycz' i sfinalizować transakcję.",
  },
  {
    question: "Jak długo mogę oglądać wypożyczony film?",
    answer:
      "Masz 48 godzin na obejrzenie filmu od momentu pierwszego uruchomienia.",
  },
  {
    question: "Czy mogę anulować wypożyczenie?",
    answer:
      "Nie, wypożyczenie jest aktywne od razu po dokonaniu płatności i nie podlega anulacji.",
  },
  {
    question: "Czy mogę oglądać na kilku urządzeniach?",
    answer:
      "Tak, możesz oglądać na różnych urządzeniach, ale tylko na jednym jednocześnie.",
  },
  {
    question: "Jakie formy płatności są akceptowane?",
    answer:
      "Płatności obsługuje Stripe – akceptujemy karty Visa, Mastercard i inne.",
  },
  {
    question: "Czy mogę anulować wypożyczenie?",
    answer:
      "Nie, wypożyczenie jest aktywne od razu po dokonaniu płatności i nie podlega anulacji.",
  },
  {
    question: "Czy mogę oglądać na kilku urządzeniach?",
    answer:
      "Tak, możesz oglądać na różnych urządzeniach, ale tylko na jednym jednocześnie.",
  },
  {
    question: "Jakie formy płatności są akceptowane?",
    answer:
      "Płatności obsługuje Stripe – akceptujemy karty Visa, Mastercard i inne.",
  },
];

export default function FaqPanel() {
  return (
    <div className="w-full space-y-6 pr-2 text-white">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Najczęstsze pytania
      </h2>

      {faqItems.map(({ question, answer }, index) => (
        <div key={index} className="bg-white/5 px-4 py-3 rounded-md">
          <p className="font-semibold text-[#b88aff] mb-1">{question}</p>
          <p className="text-sm text-white/80">{answer}</p>
        </div>
      ))}
    </div>
  );
}
