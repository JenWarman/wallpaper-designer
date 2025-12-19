import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import { fetchUserById, fetchUsers } from "./supabase/supabase";

function App() {
  useEffect(() => {
    (async () => {
      await fetchUsers();
      await fetchUserById("59f88701-892a-4a52-9b2b-6cbaa435a610");
    })();
  }, []);

  return <RegisterUser />;
}

export default App;
