import { useActionState } from "react";
import styles from "./RegisterUser.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { FormState } from "../../types/types";
import { handleRegisterUser } from "../../utils/formActions";
import { dataTestIds } from "../../utils/dataTestIds";

export function RegisterUser() {
  const [state, action, isPending] = useActionState<FormState, FormData>(
    handleRegisterUser,
    {}
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Sign Up</h3>
      <Form action={action} ctaLabel="Register" dataTestId={dataTestIds.form}>
        <Input
          label="Username"
          id="username"
          ariaLabel="username"
          type="text"
          placeholder="username"
          name="username"
          dataTestId={dataTestIds.input}
        />
        <Input
          label="Email"
          id="email"
          ariaLabel="email"
          type="text"
          placeholder="email"
          name="email"
          dataTestId={dataTestIds.input}
        />
        <Input
          label="Password"
          id="password"
          ariaLabel="password"
          type="password"
          placeholder="password"
          name="password"
          dataTestId={dataTestIds.input}
        />
      </Form>
      {isPending && <p>Registering...</p>}
      {state.message}
    </div>
  );
}
