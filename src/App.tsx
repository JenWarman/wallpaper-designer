import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import { fetchUsers } from "./supabase/supabase";

function App() {
  useEffect(() => {
    fetchUsers();
  }, []);

  return <RegisterUser />;
}

export default App;
