import { useActionState, useState } from "react";
import styles from "./RegisterUser.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { FormState } from "../../types/types";
import { handleRegisterUser } from "../../utils/formActions";
import { dataTestIds } from "../../utils/dataTestIds";

export function RegisterUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    "confirm-password": "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validateMinLength = (value: string, min: number, label: string) => {
    if (value.length < min) {
      return `Your ${label} must be at least ${min} characters.`;
    }
    return "";
  };

  const confirmPassword = (value: string, confirmationValue: string) => {
    if (value !== confirmationValue) {
      return `Your password must match.`;
    }
    return "";
  };
  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(value))
      return "Password must include one uppercase letter, one lowercase letter, one number, one special character and be at least 8 characters long.";
    return "";
  };

  const [state, action, isPending] = useActionState<FormState, FormData>(
    handleRegisterUser,
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
    if (event.target.name === "email") {
      errorMessage = validateEmail(event.target.value);
    }
    if (event.target.name === "username") {
      errorMessage = validateMinLength(
        event.target.value,
        3,
        event.target.name
      );
    }

    if (event.target.name === "password") {
      errorMessage = validatePassword(event.target.value)
    }
    if (event.target.name === "confirm-password") {
      errorMessage = confirmPassword(
        formData.password,
        formData["confirm-password"]
      );
    }

    setErrors((prev) => ({
      ...prev,
      [event?.target.name]: errorMessage,
    }));
  };
  const readyToRegister =
    formData.username !== "" &&
    formData.email !== "" &&
    formData.password !== "";

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Sign Up</h3>
      <Form
        action={action}
        ctaLabel="Register"
        dataTestId={dataTestIds.form}
        ctaAriaLabel="Register as new user"
        ctaDisabled={!readyToRegister || isPending}
      >
        <Input
          label="Username"
          id="username"
          ariaLabel="username"
          type="text"
          placeholder="username"
          name="username"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && <span className="error">{errors.username}</span>}
        <Input
          label="Email"
          id="email"
          ariaLabel="email"
          type="text"
          placeholder="email"
          name="email"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && <span className="error">{errors.email}</span>}
        <Input
          label="Password"
          id="password"
          ariaLabel="password"
          type="password"
          placeholder="password"
          name="password"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && <span className="error">{errors.password}</span>}
        <Input
          label="Confirm Password"
          id="confirm-password"
          ariaLabel="confirm password"
          type="password"
          placeholder="confirm password"
          name="confirm-password"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && <span className="error">{errors["confirm-password"]}</span>}
      </Form>
      {isPending && <p>Registering...</p>}
      {state.message}
    </div>
  );
}
