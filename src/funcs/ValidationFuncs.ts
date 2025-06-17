export const isNotEmpty = (value: string): string | null => {
  return value.trim() === "" ? "This field cannot be empty" : null;
};

export const hasMinimumLength =
  (min: number) =>
  (value: string): string | null => {
    return value.trim().length < min
      ? `At least ${min} characters required`
      : null;
  };

export const isStrongPassword = (value: string): string | null => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d).{6,}$/;
  return regex.test(value)
    ? null
    : "Password must include 1 uppercase letter, 1 special character, 1 number, and be at least 6 characters long";
};

export const isValidEmail = (value: string): string | null => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) ? null : "Invalid email address";
};

export const isNumberInRange =
  (min: number, max: number) =>
  (value: string): string | null => {
    const emptyCheck = isNotEmpty(value);
    if (emptyCheck) return emptyCheck;

    const number = Number(value);
    if (isNaN(number)) return "This field must be a number";

    if (number < min || number > max)
      return `Value must be between ${min} and ${max}`;

    return null;
  };
