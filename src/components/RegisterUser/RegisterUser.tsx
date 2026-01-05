import { useState } from "react";
import { signUpAndCreateAccount } from "../../supabase/supabase";
import type { NewUser } from "../../types/types";
import styles from "./RegisterUser.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export function RegisterUser() {
  const [newUser, setNewUser] = useState<NewUser>({
    username: "",
    email: "",
    password: "",
  });

  const handleRegisterUser = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();
    const newUserResult = await signUpAndCreateAccount(newUser);

    if (!newUserResult.success) {
      console.log("ERROR: could not create account");
      return;
    }
    console.log("new user registered", newUserResult.user);
  };

  return (
    <div className={styles.container}>
      <h3>Sign Up</h3>
      <Form onSubmit={handleRegisterUser} ctaLabel="Get Price">
        <Input
          label="Name"
          id="name"
          ariaLabel="name"
          type="text"
          placeholder="name"
          value={newUser.username}
          onChange={(event) =>
            setNewUser({ ...newUser, username: event.target.value })}
        />
          <Input
          label="Email"
          id="email"
          ariaLabel="email"
          type="text"
          placeholder="email"
          value={newUser.email}
          onChange={(event) =>
            setNewUser({ ...newUser, username: event.target.value })}
        />
        <Input
          label="Password"
          id="password"
          ariaLabel="password"
          type="password"
          placeholder="password"
          value={newUser.password}
          onChange={(event) =>
            setNewUser({ ...newUser, username: event.target.value })}
        />
      </Form>
    </div>
  );
}
