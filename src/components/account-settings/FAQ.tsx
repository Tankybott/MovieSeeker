const faqItems = [
  {
    question: "How can I rent a movie?",
    answer: "Simply select a movie, click 'Rent', and complete the payment.",
  },
  {
    question: "How long can I watch a rented movie?",
    answer:
      "You have 48 hours to watch the movie from the moment you start it.",
  },
  {
    question: "Can I cancel a rental?",
    answer:
      "No, rentals become active immediately after payment and cannot be canceled.",
  },
  {
    question: "Can I watch on multiple devices?",
    answer: "Yes, you can watch on different devices, but only one at a time.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Payments are handled by Stripe — we accept Visa, Mastercard, and more.",
  },
];

export default function FaqPanel() {
  return (
    <div className="w-full space-y-6 pr-2 text-white">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Frequently Asked Questions
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
