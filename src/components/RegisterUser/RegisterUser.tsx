import { useActionState, useState } from "react";
import styles from "./RegisterUser.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { FormState } from "../../types/types";
import { handleRegisterUser } from "../../utils/forms/formActions";
import { dataTestIds } from "../../utils/dataTestIds";
import { Link } from "react-router-dom";
import { validateRegistration } from "../../utils/validateRegistration";

export function RegisterUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    "confirm-password": "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    const errorMessage = validateRegistration(event, formData.password, formData["confirm-password"])
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
    <div className={styles.container} data-testid={dataTestIds.registration}>
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
      <p>Already have an account? <Link to="/login">Login here.</Link></p>
    </div>
  );
}
