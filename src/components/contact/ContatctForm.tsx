import { useRef, useState, useMemo } from "react";
import { isNotEmpty, isValidEmail } from "../../funcs/ValidationFuncs";
import ValidatedInput from "../utility/ValidatedInput";
import ValidatedTextarea from "../utility/ValidatedTextArea";
import OverlaySpinner from "../utility/LoadingSpinner";

const ContactForm: React.FC = () => {
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [sending, setSending] = useState(false);

  const refs = useRef<
    Record<string, { validate: () => boolean; clear: () => void }>
  >({});

  const inputConfig = useMemo(
    () => [
      {
        name: "email",
        label: "Twój email",
        type: "text",
        validateFn: isValidEmail,
      },
      {
        name: "message",
        label: "Wiadomość",
        type: "textarea",
        validateFn: isNotEmpty,
      },
    ],
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ type: null, message: "" });

    let allValid = true;
    for (const { name } of inputConfig) {
      const isValid = refs.current[name]?.validate();
      if (!isValid) allValid = false;
    }

    if (!allValid) return;

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    inputConfig.forEach(({ name }) => {
      payload[name] = formData.get(name)?.toString() || "";
    });

    console.log(payload);

    setSending(true);
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    })
      .then(() => {
        setFeedback({
          type: "success",
          message: "Wiadomość została wysłana!",
        });
        Object.values(refs.current).forEach((ref) => ref.clear?.());
      })
      .catch(() => {
        setFeedback({
          type: "error",
          message: "Wystąpił błąd podczas wysyłania wiadomości.",
        });
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="relative flex w-full h-full">
      {sending && <OverlaySpinner />}

      <form
        onSubmit={handleSubmit}
        className="w-full p-4 py-6 lg:p-6 rounded-xl border border-primary text-white shadow-highlight-glow"
      >
        <p
          className={`text-sm text-center h-4 mb-4 transition-colors duration-200 ${
            feedback.type === "success"
              ? "text-green-400"
              : feedback.type === "error"
              ? "text-red-500"
              : "text-transparent"
          }`}
        >
          {feedback.message || "placeholder"}
        </p>

        <div className="w-full flex flex-col gap-4">
          {inputConfig.map(({ name, label, type, validateFn }) => (
            <div key={name} className="w-full">
              {type === "textarea" ? (
                <ValidatedTextarea
                  name={name}
                  label={label}
                  validateFn={validateFn}
                  ref={(el) => {
                    if (el) refs.current[name] = el;
                  }}
                />
              ) : (
                <ValidatedInput
                  name={name}
                  label={label}
                  type={type}
                  validateFn={validateFn}
                  ref={(el) => {
                    if (el) refs.current[name] = el;
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full lg:w-1/2 mx-auto block mt-10 mb-4 py-2 rounded-md bg-primary hover:bg-primary-dark transition-colors duration-200"
        >
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
