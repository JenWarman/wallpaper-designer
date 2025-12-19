import { useState } from "react";
import { signUpAndCreateAccount } from "../../supabase/supabase";
import type { NewUser } from "../../types/types";

export function RegisterUser() {
  const [newUser, setNewUser] = useState<NewUser>({
    username: "",
    email: "",
    password: "",
  });

  const handleRegisterUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const newUserResult = await signUpAndCreateAccount(newUser)

    if (!newUserResult.success) {
        console.log("ERROR: could not create account")
        return;
    }
    console.log("new user registered", newUserResult.user)
    console.log("new account created")
  };
  
  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={handleRegisterUser}>
        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          value={newUser.username}
          onChange={(event) =>
            setNewUser({ ...newUser, username: event.target.value })
          }
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          value={newUser.email}
          onChange={(event) =>
            setNewUser({ ...newUser, email: event.target.value })
          }
        />
        <label>Password</label>
        <input
          type="text"
          placeholder="password"
          value={newUser.password}
          onChange={(event) =>
            setNewUser({ ...newUser, password: event.target.value })
          }
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
