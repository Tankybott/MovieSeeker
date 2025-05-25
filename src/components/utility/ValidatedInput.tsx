import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const ValidatedInput = forwardRef<
  { validate: () => boolean; clear: () => void } | null,
  {
    name: string;
    label: string;
    type: string;
    validateFn: (value: string) => string | null;
    value?: string;
  }
>(({ name, label, type, validateFn, value = "" }, ref) => {
  const [internalValue, setInternalValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [wasBlurred, setWasBlurred] = useState(false);

  // Update internal state if external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleBlur = () => {
    setWasBlurred(true);
    const result = validateFn(internalValue);
    setError(result);
    return !result;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    if (wasBlurred) {
      const result = validateFn(val);
      setError(result);
    }
  };

  useImperativeHandle(ref, () => ({
    validate: handleBlur,
    clear: () => {
      setInternalValue("");
      setError(null);
      setWasBlurred(false);
    },
  }));

  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full px-3 py-2 rounded-md bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-[#7308B0] text-white"
      />
      <p
        className={`text-red-500 text-sm ${
          type === "password" ? "h-8 lg:h-4" : "h-4"
        } mt-2 text-center`}
      >
        {error || ""}
      </p>
    </div>
  );
});

export default ValidatedInput;
