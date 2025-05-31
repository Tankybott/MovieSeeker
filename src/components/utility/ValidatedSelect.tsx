import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const ValidatedSelect = forwardRef(
  (
    {
      name,
      label,
      validateFn,
      options,
      value = "",
    }: {
      name: string;
      label: string;
      validateFn: (value: string) => string | null;
      options: string[];
      value?: string;
    },
    ref: React.Ref<{ validate: () => boolean }>
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const [error, setError] = useState<string | null>(null);
    const [wasBlurred, setWasBlurred] = useState(false);

    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    const handleBlur = () => {
      setWasBlurred(true);
      const result = validateFn(internalValue);
      setError(result);
      return !result;
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      setInternalValue(val);
      if (wasBlurred) {
        const result = validateFn(val);
        setError(result);
      }
    };

    useImperativeHandle(ref, () => ({
      validate: handleBlur,
    }));

    return (
      <div>
        <label htmlFor={name} className="block text-sm mb-1">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-3 py-2 rounded-md bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-[#7308B0] text-white"
        >
          <option value="">-- Wybierz --</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="text-red-500 text-sm h-4 mt-2 text-center">
          {error || ""}
        </p>
      </div>
    );
  }
);

export default ValidatedSelect;
