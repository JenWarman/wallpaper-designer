import { loginAndStartSession } from "../../supabase/supabase";
import { Form } from "../Form/Form";
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
      <h3>Login</h3>
      {/* <form onSubmit={handleLoginAndStartSession}>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button>Login</button>
      </form> */}
      <Form
        label={["email", "password"]}
        type="text"
        placeholder="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        ctaLabel="Login"
        onSubmit={handleLoginAndStartSession}
        arialabel="Login"
        id="email"
      />
    </div>
  );
}
