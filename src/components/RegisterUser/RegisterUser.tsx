import { useState } from "react";
import { registerUser } from "../../supabase/supabase";

export function RegisterUser() {
    const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegisterUser = () => {
    registerUser({newUser, event})
  }
   return (
    <div>
      <h1>Sign Up</h1>
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
   )
}