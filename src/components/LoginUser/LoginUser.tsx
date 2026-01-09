import { handleLoginAndStartSession } from "../../utils/forms/formActions";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import styles from "./LoginUser.module.scss";
import { useActionState, useState } from "react";
import type { FormState } from "../../types/types";
import { dataTestIds } from "../../utils/dataTestIds";
import {
  validateEmail,
  validatePassword,
} from "../../utils/forms/formValidation";

export function LoginUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [state, action, isPending] = useActionState<FormState, FormData>(
    handleLoginAndStartSession,
    {}
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setErrors((prev) => ({
      ...prev,
      [event?.target.name]: errorMessage,
    }));
  };

  const readyToLogin = formData.email !== "" && formData.password !== "";

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Login</h3>
      <Form
        action={action}
        ctaLabel="Login"
        dataTestId={dataTestIds.form}
        ctaAriaLabel="Login"
        ctaDisabled={!readyToLogin || isPending}
      >
        <Input
          label="email"
          id="email"
          ariaLabel="log in with email"
          type="text"
          placeholder="email"
          name="email"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && <span className="error">{errors.email}</span>}
        <Input
          label="password"
          id="password"
          ariaLabel="log in with password"
          type="password"
          placeholder="password"
          name="password"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && <span className="error">{errors.password}</span>}
      </Form>
      {isPending && <p>Logging in...</p>}
      {state.message}
    </div>
  );
}
