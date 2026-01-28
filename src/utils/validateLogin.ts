import { validateEmail, validatePassword } from "./forms/formValidation";

export function validateLogin(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event)
    let errorMessage = "";
        switch (event.target.name) {
          case "email":
            errorMessage = validateEmail(event.target.value);
            break;
          case "password":
            errorMessage = validatePassword(event.target.value);
            break;
          default:
            errorMessage = "Please enter a valid input";
        }
        return errorMessage;
}