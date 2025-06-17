import { useRef, useState } from "react";

const ForgotPasswordForm: React.FC<{ shouldShowLogin: () => void }> = ({
  shouldShowLogin,
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState(false);

  const simulatePasswordReset = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value.trim() || "";

    if (email === "") {
      setEmailError("Email address is empty");
      return;
    }

    setEmailError("");
    setSending(true);
    simulatePasswordReset().then(() => {
      setSubmitted(true);
      setSending(false);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 rounded-xl border border-primary text-white shadow-highlight-glow"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Reset password
      </h2>
      <div className="mb-6">
        <label className="block text-sm mb-1" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          ref={emailRef}
          className="w-full px-3 py-2 rounded-md bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="text-sm h-8 mt-1 text-center p-2">
          {emailError && <span className="text-red-500">{emailError}</span>}
          {!emailError && submitted && (
            <span className="text-green-500">Email has been sent</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full mb-4 py-2 rounded-md bg-primary hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50"
      >
        {submitted ? "Resend" : "Send message"}
      </button>
      <button
        type="button"
        onClick={shouldShowLogin}
        className="text-sm w-full mt-3 text-primary text-center cursor-pointer hover:underline"
      >
        Back to login
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
