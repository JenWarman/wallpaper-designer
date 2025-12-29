import styles from "./LoginUser.module.scss";
import supabase from "../../supabase/supabaseClient";
import { useState } from "react";

export function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAndGetSession = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error }
      }
      console.log("user signed in with id: ", data.user.id)
  };
  
  return (
    <div className={styles.container}>
      <h3>Login</h3>
      <form onSubmit={loginAndGetSession}>
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
