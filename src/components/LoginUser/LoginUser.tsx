import { loginAndStartSession } from "../../supabase/supabase";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import styles from "./LoginUser.module.scss";
import { useState } from "react";

export function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginAndStartSession = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await loginAndStartSession(email, password);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Login</h3>
      <Form onSubmit={handleLoginAndStartSession} ctaLabel="Login">
        <Input
          label="email"
          id="email"
          ariaLabel="log in with email"
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
         <Input
          label="password"
          id="password"
          ariaLabel="log in with password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form>
    </div>
  );
}
