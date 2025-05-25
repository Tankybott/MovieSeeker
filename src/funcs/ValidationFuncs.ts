export const isNotEmpty = (value: string): string | null => {
  return value.trim() === "" ? "To pole nie może być puste" : null;
};

export const hasMinimumLength =
  (min: number) =>
  (value: string): string | null => {
    return value.trim().length < min
      ? `Wymagane co najmniej ${min} znaki`
      : null;
  };

export const isStrongPassword = (value: string): string | null => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d).{6,}$/;
  return regex.test(value)
    ? null
    : "Hasło musi mieć 1 dużą literę, 1 znak specjalny, 1 cyfrę i min. 6 znaków";
};

export const isValidEmail = (value: string): string | null => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) ? null : "Nieprawidłowy adres email";
};
