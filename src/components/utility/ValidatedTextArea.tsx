import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const ValidatedTextarea = forwardRef<
  { validate: () => boolean; clear: () => void } | null,
  {
    name: string;
    label: string;
    validateFn: (value: string) => string | null;
    value?: string;
  }
>(({ name, label, validateFn, value = "" }, ref) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    if (wasBlurred) {
      const result = validateFn(val);
      setError(result);
    }
  };

  const clear = () => {
    setInternalValue("");
    setError(null);
    setWasBlurred(false);
  };

  useImperativeHandle(ref, () => ({
    validate: handleBlur,
    clear,
  }));

  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full px-3 py-2 h-32 resize-none rounded-md bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-primary text-white"
      />
      <p className="text-red-500 text-sm h-4 mt-2 text-center">{error || ""}</p>
    </div>
  );
});

export default ValidatedTextarea;
