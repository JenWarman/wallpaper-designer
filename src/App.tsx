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
import { LoginUser } from "./components/LoginUser/LoginUser";
function App() {
  useEffect(() => {
    (async () => {
      await fetchUsers();
<<<<<<< HEAD
      await fetchUserById("59f88701-892a-4a52-9b2b-6cbaa435a610");
      const orderById = await fetchOrderByUserId(
        "59f88701-892a-4a52-9b2b-6cbaa435a610"
      );
      //  console.log(orderById, "<---order")
=======
      await fetchUserById();
     const orderById = await fetchOrderByUserId()
    //  console.log(orderById, "<---order")
>>>>>>> main
    })();
  }, []);

  const handleUpdateOrder = async () => {
    const orders = await updateOrderByUserId(
<<<<<<< HEAD
      "59f88701-892a-4a52-9b2b-6cbaa435a610",
      5,
      350.79
=======
      5, 350.79
>>>>>>> main
    );
    // console.log("ORDER", orders)
  };

<<<<<<< HEAD
  const handleSaveDesign = async () => {
    const designs = await saveDesignByUserId(
      "59f88701-892a-4a52-9b2b-6cbaa435a610",
      "design-3"
    );
    console.log("DESIGN", designs);
  };
=======
>>>>>>> main
  return (
    <>
      <RegisterUser />
      <LoginUser/>
      <button onClick={handleUpdateOrder}>Order</button>
      <button onClick={handleSaveDesign}>Save Design</button>
    </>
  );
}

export default App;
