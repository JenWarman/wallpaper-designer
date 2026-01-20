import { useEffect, useState } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import { fetchDesignsByUserId, getUserSession } from "./supabase/supabase";
import { LoginUser } from "./components/LoginUser/LoginUser";
import { OrderForm } from "./components/OrderForm/OrderForm";
// import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { useDispatch } from "react-redux";
import { saveUser } from "./store/userSlice";
import { DesignForm } from "./components/DesignForm/DesignForm";
import { Routes, Route, Link } from "react-router-dom";
import { DesignContainer } from "./components/DesignContainer/DesignContainer";
import { Header } from "./components/Header/Header";
import { SavedDesigns } from "./components/SavedDesigns/SavedDesigns";

function App() {
  const dispatch = useDispatch();
  const [savedDesignsUrl, setSavedDesignsUrl] = useState([]);

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

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/design" element={<><DesignContainer/><DesignForm/></>} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/saved-designs" element={<SavedDesigns />} />
      </Routes>
      {/* <ProgressBar /> */}
    </>
  );
}

export default App;
