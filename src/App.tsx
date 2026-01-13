import { useEffect, useState } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import { fetchDesignsByUserId, getUserSession } from "./supabase/supabase";
import { LoginUser } from "./components/LoginUser/LoginUser";
import { OrderForm } from "./components/OrderForm/OrderForm";
// import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "./store/userSlice";
import { getUserId, getUsername } from "./store/selectors/userSelector";
import { DesignForm } from "./components/DesignForm/DesignForm";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [savedDesignsUrl, setSavedDesignsUrl] = useState("");

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
      const savedDesigns = await fetchDesignsByUserId();

      if (savedDesigns?.data.length) {
        //fetching first design url from table
        setSavedDesignsUrl(savedDesigns?.data[0].design_url);
      }
    })();
  }, [dispatch]);

  const userId = useSelector(getUserId);
  const username = useSelector(getUsername);

  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterUser/>} />
        <Route path="/design" element={<DesignForm />} />
        <Route path="/login" element={<LoginUser/>}/>
        <Route path="/order" element={<OrderForm/>}/>
      </Routes>
      {/* <ProgressBar /> */}
      <p>See your saved designs </p>
      <Link to={`/design?${savedDesignsUrl}`}>HERE</Link>
    </>
  );
}

export default App;
