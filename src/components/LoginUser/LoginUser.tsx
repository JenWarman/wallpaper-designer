import { handleLoginAndStartSession } from "../../utils/forms/handleLoginAndStartSession.ts";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import styles from "./LoginUser.module.scss";
import { useActionState, useState } from "react";
import type { FormState } from "../../types/types";
import { dataTestIds } from "../../utils/dataTestIds";
import { validateLogin } from "../../utils/validateLogin";

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
    const errorMessage = validateLogin(event)
    setErrors((prev) => ({
      ...prev,
      [event?.target.name]: errorMessage,
    }));
  };

  const readyToLogin = formData.email !== "" && formData.password !== "";

  return (
    <div className={styles.container} data-testid={dataTestIds.login}>
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
