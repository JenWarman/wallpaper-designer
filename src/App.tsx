import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import {
  fetchDesignsByUserId,
  fetchOrderByUserId,
  saveDesignByUserId,
  updateOrderByUserId,
} from "./supabase/supabase";
import { LoginUser } from "./components/LoginUser/LoginUser";
function App() {

  useEffect(() => {
    (async () => {
     const orderById = await fetchOrderByUserId()
    //  console.log(orderById, "<---order")
    const designs = await fetchDesignsByUserId()
    // console.log("Users designs: ", designs)
    })();
  }, []);

  const handleUpdateOrder = async () => {
    const orders = await updateOrderByUserId(
      5, 350.79
    );
    // console.log("ORDER", orders)
  };

  const handleSaveDesign = async () => {
    const design = await saveDesignByUserId("design-4")
    console.log(design)
  }

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
