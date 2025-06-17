import { useRef, useState } from "react";
import ValidatedInput from "../utility/ValidatedInput";
import {
  isNotEmpty,
  isValidEmail,
  isStrongPassword,
} from "../../funcs/ValidationFuncs";

const RegisterForm: React.FC<{ shouldShowLogin: () => void }> = ({
  shouldShowLogin,
}) => {
  const [passwordValue, setPasswordValue] = useState("");
  const [globalError, setGlobalError] = useState("");

  const refs = useRef<Record<string, { validate: () => boolean }>>({});

  const inputConfig = [
    {
      name: "fullName",
      label: "Full name",
      type: "text",
      validateFn: isNotEmpty,
    },
    {
      name: "streetAddress",
      label: "Street address",
      type: "text",
      validateFn: isNotEmpty,
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      validateFn: isNotEmpty,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      validateFn: isNotEmpty,
    },
    {
      name: "postalCode",
      label: "Postal code",
      type: "text",
      validateFn: isNotEmpty,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      validateFn: isValidEmail,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      validateFn: isStrongPassword,
    },
    {
      name: "repeatPassword",
      label: "Repeat password",
      type: "password",
      validateFn: (val: string) =>
        val !== passwordValue ? "Passwords must match" : null,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");

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
      if (name !== "repeatPassword") {
        payload[name] = formData.get(name)?.toString() || "";
      }
    });

    // Simulate register fetch
    new Promise<void>((_, reject) => {
      setTimeout(() => reject("Registration failed. Please try again."), 1000);
    }).catch((msg) => setGlobalError(msg));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center py-8 rounded-xl border border-primary text-white shadow-highlight-glow"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <p className="text-red-500 text-sm text-center h-4 mb-4">{globalError}</p>
      <div className="flex flex-wrap gap-y-4 justify-around">
        {inputConfig.map(({ name, label, type, validateFn }) => (
          <div key={name} className="w-full lg:w-[40%] px-0 lg:px-2">
            <ValidatedInput
              name={name}
              label={label}
              type={type}
              validateFn={(val) => {
                if (name === "password") setPasswordValue(val);
                return validateFn(val);
              }}
              ref={(el) => {
                if (el) {
                  refs.current[name] = el;
                }
              }}
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full mt-10 lg:w-1/2 mb-4 py-2 rounded-md bg-primary hover:bg-primary-dark transition-colors duration-200"
      >
        Register
      </button>
      <div
        className="text-sm text-primary text-center cursor-pointer hover:underline my-2"
        onClick={shouldShowLogin}
      >
        Already have an account?
      </div>
    </form>
  );
};

export default RegisterForm;
