import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC<{
  showRegister: () => void;
  showForgetPassword: () => void;
}> = ({ showRegister, showForgetPassword }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const simulateLogin = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(); // Simulated failure
      }, 1000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const username = usernameRef.current?.value.trim() || "";
    const password = passwordRef.current?.value.trim() || "";

    if (username === "" || password === "") {
      setLoginError("Hasło lub nazwa użytkownika są puste");
      return;
    }

    setLoginError("");
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      simulateLogin()
        .then(() => navigate("/"))
        .catch(() =>
          setLoginError("Hasło lub nazwa użytkownika są niepoprawne")
        );
    }
  }, [submitted, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 rounded-xl border border-primary text-white shadow-highlight-glow"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Zaloguj się</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1" htmlFor="username">
          Email
        </label>
        <input
          id="username"
          type="email"
          ref={usernameRef}
          className="w-full px-3 py-2 rounded-md bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm mb-1" htmlFor="password">
          Hasło
        </label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
          className="w-full px-3 py-2 rounded-md bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="text-red-500 text-sm h-8 mt-1 text-center p-2">
          {loginError}
        </div>
      </div>
      <button
        type="submit"
        className="w-full mb-4 py-2 rounded-md bg-primary hover:bg-primary-dark transition-colors duration-200"
      >
        Zaloguj
      </button>
      <div className="flex justify-around text-sm mt-3">
        <button
          type="button"
          onClick={showRegister}
          className="text-primary hover:underline cursor-pointer"
        >
          Nie masz konta?
        </button>
        <button
          type="button"
          onClick={showForgetPassword}
          className="text-primary hover:underline cursor-pointer"
        >
          Zapomniałeś hasła?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
