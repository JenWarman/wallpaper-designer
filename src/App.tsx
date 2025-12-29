import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import {
  fetchOrderByUserId,
  fetchUserById,
  fetchUsers,
  saveDesignByUserId,
  updateOrderByUserId,
} from "./supabase/supabase";
function App() {
  useEffect(() => {
    (async () => {
      await fetchUsers();
      await fetchUserById("59f88701-892a-4a52-9b2b-6cbaa435a610");
      const orderById = await fetchOrderByUserId(
        "59f88701-892a-4a52-9b2b-6cbaa435a610"
      );
      //  console.log(orderById, "<---order")
    })();
  }, []);

  const handleUpdateOrder = async () => {
    const orders = await updateOrderByUserId(
      "59f88701-892a-4a52-9b2b-6cbaa435a610",
      5,
      350.79
    );
    // console.log("ORDER", orders)
  };

  const handleSaveDesign = async () => {
    const designs = await saveDesignByUserId(
      "59f88701-892a-4a52-9b2b-6cbaa435a610",
      "design-3"
    );
    console.log("DESIGN", designs);
  };
  return (
    <>
      <RegisterUser />
      <button onClick={handleUpdateOrder}>Order</button>
      <button onClick={handleSaveDesign}>Save Design</button>
    </>
  );
}

export default App;
