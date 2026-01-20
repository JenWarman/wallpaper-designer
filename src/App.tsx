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
      const savedDesigns = await fetchDesignsByUserId();

      if (savedDesigns?.data.length) {
        const designs = [];
        savedDesigns.data.filter((design) => {
          designs.push(design.design_url);
          setSavedDesignsUrl(designs);
        });
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
      </Routes>
      {/* <ProgressBar /> */}
      <div className="savedDesigns">
        <p>See your saved designs </p>
        <ul>
          {savedDesignsUrl.map((url) => (
            <li key={url}>
              <Link to={`/design?${url}`}>HERE</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
