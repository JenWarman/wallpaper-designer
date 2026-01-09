export const validateEmail = (value: string) => {
  if (!value) return "Email is required";
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(value)) return "Please enter a valid email address";
  return "";
};

export const validateMinLength = (
  value: string,
  min: number,
  label: string
) => {
  if (value.length < min) {
    return `Your ${label} must be at least ${min} characters.`;
  }
  return "";
};

export const confirmPassword = (value: string, confirmationValue: string) => {
  if (value !== confirmationValue) {
    return `Your password must match.`;
  }
  return "";
};

export const validatePassword = (value: string) => {
  if (!value) return "Password is required";
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(value))
    return "Password must include one uppercase letter, one lowercase letter, one number, one special character and be at least 8 characters long.";
  return "";
};
