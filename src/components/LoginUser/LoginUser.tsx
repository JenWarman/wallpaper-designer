import { handleLoginAndStartSession } from "../../utils/formActions";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import styles from "./LoginUser.module.scss";
import { useActionState } from "react";
import type { FormState } from "../../types/types";
import {dataTestIds} from "../../utils/dataTestIds"

export function LoginUser() {
  const [state, action, isPending] = useActionState<FormState, FormData>(handleLoginAndStartSession, {})

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Login</h3>
      <Form action={action} ctaLabel="Login" dataTestId={dataTestIds.form}>
        <Input
          label="email"
          id="email"
          ariaLabel="log in with email"
          type="text"
          placeholder="email"
          name="email"
          dataTestId={dataTestIds.input}
        />
         <Input
          label="password"
          id="password"
          ariaLabel="log in with password"
          type="password"
          placeholder="password"
          name="password"
          dataTestId={dataTestIds.input}
        />
      </Form>
      {isPending && (<p>Logging in...</p>)}
      {state.message}
    </div>
  );
}
