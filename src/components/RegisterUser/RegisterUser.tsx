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
    password: ""
  })

  const [state, action, isPending] = useActionState<FormState, FormData>(
    handleRegisterUser,
    {}
  );

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]:event.target.value,
    }));
  };

  const readyToRegister = formData.username !== "" && formData.email !== "" && formData.password !== ""

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Sign Up</h3>
      <Form action={action} ctaLabel="Register" dataTestId={dataTestIds.form} ctaAriaLabel="Register as new user" ctaDisabled={!readyToRegister || isPending}>
        <Input
          label="Username"
          id="username"
          ariaLabel="username"
          type="text"
          placeholder="username"
          name="username"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
        />
        <Input
          label="Email"
          id="email"
          ariaLabel="email"
          type="text"
          placeholder="email"
          name="email"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
        />
        <Input
          label="Password"
          id="password"
          ariaLabel="password"
          type="password"
          placeholder="password"
          name="password"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
        />
      </Form>
      {isPending && <p>Registering...</p>}
      {state.message}
    </div>
  );
}
