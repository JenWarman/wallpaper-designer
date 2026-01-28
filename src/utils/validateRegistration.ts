import { confirmPassword, validateEmail, validateMinLength, validatePassword } from "./forms/formValidation";

export function validateRegistration(event: React.ChangeEvent<HTMLInputElement>, password: string, confirmPasswordValue: string) {
    let errorMessage = "";

    switch (event.target.name) {
      case "email":
        errorMessage = validateEmail(event.target.value);
        break;
      case "username":
        errorMessage = validateMinLength(
          event.target.value,
          3,
          event.target.name
        );
        break;
      case "password":
        errorMessage = validatePassword(event.target.value);
        break;
      case "confirm-password":
        errorMessage = confirmPassword(
          password,
          confirmPasswordValue
        );
        break;
      default:
        errorMessage = "Please enter a valid input";
    }
    return errorMessage;
}