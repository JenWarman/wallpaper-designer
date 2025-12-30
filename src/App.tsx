import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import {
  fetchDesignsByUserId,
  fetchOrderByUserId,
  createDesignByUserId,
} from "./supabase/supabase";
import { LoginUser } from "./components/LoginUser/LoginUser";
import { OrderForm } from "./components/OrderForm/OrderForm";
function App() {

  useEffect(() => {
    (async () => {
     const orderById = await fetchOrderByUserId()
    //  console.log(orderById, "<---order")
    const designs = await fetchDesignsByUserId()
    // console.log("Users designs: ", designs)
    })();
  }, []);

  const handleSaveDesign = async () => {
    const design = await createDesignByUserId("design-4")
    console.log(design, "design")
  }

  return (
    <>
      <RegisterUser />
      <LoginUser/>
      <OrderForm/>
      <button onClick={handleSaveDesign}>Save Design</button>
    </>
  );
}

export default App;
