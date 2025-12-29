import { loginAndStartSession } from "../../supabase/supabase";
import styles from "./LoginUser.module.scss";
import { useState } from "react";

export function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginAndStartSession = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginAndStartSession(email, password)
  }

  return (
    <div className={styles.container}>
      <h3>Login</h3>
      <form onSubmit={handleLoginAndStartSession}>
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
      </form>
    </div>
  );
}
