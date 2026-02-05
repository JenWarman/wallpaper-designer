import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import {  getUserSession } from "./supabase/supabase";
import { LoginUser } from "./components/LoginUser/LoginUser";
import { OrderForm } from "./components/OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "./store/userSlice";
import { DesignForm } from "./components/DesignForm/DesignForm";
import { Routes, Route} from "react-router-dom";
import { DesignContainer } from "./components/DesignContainer/DesignContainer";
import { Header } from "./components/Header/Header";
import { SavedDesigns } from "./components/SavedDesigns/SavedDesigns";
import { getUsername } from "./store/selectors/userSelector";
import { PlacedOrders } from "./components/PlacedOrders/PlacedOrders";
import { OrderTracking } from "./components/OrderTracking/OrderTracking";
import { Admin } from "./components/Admin/Admin";
import { Archive } from "./components/Archive/Archive";
import { Home } from "./components/Home/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userSession = await getUserSession();
      if (userSession) {
        dispatch(
          saveUser({
            user_id: userSession.user_id,
            username: userSession.username,
          })
        );
      }
    })();
  }, [dispatch]);

 const user = useSelector(getUsername)

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/register" element={<RegisterUser />} />
        <Route path="/design" element={<><DesignContainer/><DesignForm/></>} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/saved-designs" element={<SavedDesigns />} />
        <Route path="/your-orders" element={<PlacedOrders/>}/>
        <Route path="/order-tracking" element={<OrderTracking/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/archive" element={<Archive/>}/>
      </Routes>
    </>
  );
}

export default App;
