import { useEffect, useMemo, useRef, useState } from "react";
import { isNotEmpty } from "../../funcs/ValidationFuncs";
import ValidatedInput from "../utility/ValidatedInput";
import LoadingSpinner from "../utility/LoadingSpinner"; 

const PersonalDataSettingsForm: React.FC = () => {
  const [globalError, setGlobalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [defaultValues, setDefaultValues] = useState<Record<string, string>>(
    {}
  );

  const refs = useRef<Record<string, { validate: () => boolean }>>({});

  const inputConfig = useMemo(
    () => [
      {
        name: "fullName",
        label: "Imię i nazwisko",
        type: "text",
        validateFn: isNotEmpty,
      },
      {
        name: "streetAddress",
        label: "Ulica",
        type: "text",
        validateFn: isNotEmpty,
      },
      { name: "country", label: "Kraj", type: "text", validateFn: isNotEmpty },
      { name: "city", label: "Miasto", type: "text", validateFn: isNotEmpty },
      {
        name: "postalCode",
        label: "Kod pocztowy",
        type: "text",
        validateFn: isNotEmpty,
      },
    ],
    []
  );

  useEffect(() => {
    setTimeout(() => {
      const fetched: Record<string, string | null> = {
        fullName: "Jan Kowalski",
        streetAddress: "ul. Główna 12",
        country: "Polska",
        city: "Warszawa",
        postalCode: null,
      };

      const sanitized = Object.fromEntries(
        inputConfig.map(({ name }) => [name, fetched[name] ?? ""])
      );

      setDefaultValues(sanitized);
      setLoading(false);
    }, 1000);
  }, [inputConfig]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    setSuccessMessage("");

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

    setSaving(true);
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    })
      .then(() => setSuccessMessage("Zapisano zmiany"))
      .catch((msg) => setGlobalError(msg))
      .finally(() => setSaving(false));
  };

  return (
    <div className="relative w-full h-full min-h-[40vh] lg:min-h-0">
      {loading && <LoadingSpinner isOverlay={false} />}
      {saving && <LoadingSpinner isOverlay={true} />}

      {!loading && (
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col items-center p-6 text-white"
        >
          <p
            className={`text-sm text-center h-4 mb-4 transition-colors duration-200 ${
              globalError
                ? "text-red-500"
                : successMessage
                ? "text-green-500"
                : "text-transparent"
            }`}
          >
            {globalError || successMessage || "placeholder"}
          </p>

          <div className="flex flex-wrap gap-y-4 justify-around">
            {inputConfig.map(({ name, label, type, validateFn }) => (
              <div key={name} className="w-full lg:w-[60%] px-0 lg:px-2">
                <ValidatedInput
                  name={name}
                  label={label}
                  type={type}
                  validateFn={validateFn}
                  value={defaultValues[name]}
                  ref={(el) => {
                    if (el) refs.current[name] = el;
                  }}
                />
              </div>
            ))}
          </div>

          <div className="w-full pb-3 flex justify-center">
            <button
              type="submit"
              className="w-full mt-10 lg:w-1/2 mb-4 py-2 rounded-md bg-primary hover:bg-primary-dark transition-colors duration-200"
            >
              Zapisz zmiany
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PersonalDataSettingsForm;
