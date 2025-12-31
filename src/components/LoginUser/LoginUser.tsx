import { loginAndStartSession } from "../../supabase/supabase";
import styles from "./LoginUser.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import  saveUser from "../../store/userSlice"

export function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLoginAndStartSession = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const user = await loginAndStartSession(email, password);

    //  console.log( "user logged in: ", user.user?.user_metadata.username )
    console.log("user logged in: ", user);
    // user_id = user.user.id
    //username = user.user_metadata.username
    if (user) {
      dispatch({
        user_id: user.user?.id,
        username: user.user?.user_metadata.username,
      });
    }
  };
  // const loggedInUser = useSelector(saveUser)
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
