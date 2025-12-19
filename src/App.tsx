import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import {
  fetchUserById,
  fetchUsers,
  updateOrderByUserId,
} from "./supabase/supabase";

function App() {

  useEffect(() => {
    (async () => {
      await fetchUsers();
      await fetchUserById("59f88701-892a-4a52-9b2b-6cbaa435a610");
    })();
  }, []);

  const handleUpdateOrder = async () => {
    const orders = await updateOrderByUserId(
      "59f88701-892a-4a52-9b2b-6cbaa435a610",
      5, 350.79
    );
    console.log("ORDER", orders)
  };

  return (
    <>
      <RegisterUser />
      <button onClick={handleUpdateOrder}>Order</button>
    </>
  );
}

export default App;
