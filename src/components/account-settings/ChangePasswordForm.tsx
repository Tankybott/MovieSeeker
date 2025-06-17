import { useRef, useState } from "react";
import { isNotEmpty, isStrongPassword } from "../../funcs/ValidationFuncs";
import ValidatedInput from "../utility/ValidatedInput";
import OverlaySpinner from "../utility/LoadingSpinner";

const ChangePasswordForm: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const refs = useRef<
    Record<string, { validate: () => boolean; clear: () => void }>
  >({});
  const newPasswordRef = useRef<string>("");

  const inputConfig = [
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      validateFn: (val: string) => {
        newPasswordRef.current = val;
        return isStrongPassword(val);
      },
    },
    {
      name: "repeatNewPassword",
      label: "Repeat New Password",
      type: "password",
      validateFn: (val: string) =>
        val !== newPasswordRef.current ? "Passwords must match" : null,
    },
    {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
      validateFn: isNotEmpty,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    let allValid = true;
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const values: Record<string, string> = {};

    inputConfig.forEach(({ name }) => {
      const value = formData.get(name)?.toString() || "";
      values[name] = value;
      const isValid = refs.current[name]?.validate();
      if (!isValid) allValid = false;
    });

    if (!allValid) return;

    setLoading(true);

    simulateCurrentPasswordCheck(values.currentPassword)
      .then(() => simulatePasswordChange(values.newPassword))
      .then(() => {
        setSuccessMsg("Password changed successfully");
        setLoading(false);
      })
      .catch((err) => {
        if (err === "invalid-current") {
          setErrorMsg("Your current password is incorrect");
        } else {
          setErrorMsg("Something went wrong. Please try again later.");
        }
        setLoading(false);
      });
  };

  const simulateCurrentPasswordCheck = (entered: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (entered === "correct_password") {
          resolve();
        } else {
          reject("invalid-current");
        }
      }, 1000);
    });
  };

  const simulatePasswordChange = (newPassword: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("New password saved:", newPassword);
        Object.values(refs.current).forEach((ref) => ref?.clear?.());
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="relative w-full h-full">
      {loading && <OverlaySpinner />}

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center text-white min-h-[40vh]"
      >
        <p
          className={`text-sm text-center h-4 mb-4 transition-colors duration-200 ${
            errorMsg
              ? "text-red-500"
              : successMsg
              ? "text-green-500"
              : "text-transparent"
          }`}
        >
          {errorMsg || successMsg || "placeholder"}
        </p>

        <div className="flex flex-wrap gap-y-4 justify-around w-full">
          {inputConfig.map(({ name, label, type, validateFn }) => (
            <div key={name} className="w-full  lg:w-[60%] px-0 lg:px-2">
              <ValidatedInput
                name={name}
                label={label}
                type={type}
                validateFn={validateFn}
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
          className="w-full mt-5 lg:w-1/2 mb-4 py-2 rounded-md bg-primary hover:bg-primary-dark transition-colors duration-200"
        >
          Save New Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
