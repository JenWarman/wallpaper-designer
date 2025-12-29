import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import {
  fetchOrderByUserId,
  fetchUserById,
  fetchUsers,
  updateOrderByUserId,
} from "./supabase/supabase";
import { LoginUser } from "./components/LoginUser/LoginUser";
function App() {

  useEffect(() => {
    (async () => {
      await fetchUsers();
      await fetchUserById();
     const orderById = await fetchOrderByUserId()
    //  console.log(orderById, "<---order")
    })();
  }, []);

  const handleUpdateOrder = async () => {
    const orders = await updateOrderByUserId(
      5, 350.79
    );
    // console.log("ORDER", orders)
  };

  return (
    <>
      <RegisterUser />
      <LoginUser/>
      <button onClick={handleUpdateOrder}>Order</button>
    </>
  );
}

export default App;
