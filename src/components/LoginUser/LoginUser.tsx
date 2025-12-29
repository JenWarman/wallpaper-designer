import styles from "./LoginUser.module.scss";

export function LoginUser() {

    const handleLoginUser = async (event: React.FormEvent<HTMLFormElement>) => {
          event?.preventDefault();
        console.log("logged in!")
    }

  return (
    <div className={styles.container}>
      <h3>Login</h3>
      <form onSubmit={handleLoginUser}>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            value="username"
            onChange={(event) => console.log(event?.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            placeholder="password"
            value="password"
            onChange={(event) => console.log(event?.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}
