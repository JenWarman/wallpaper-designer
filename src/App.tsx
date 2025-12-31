import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import {
  createDesignByUserId,
  getUserSession,
} from "./supabase/supabase";
import { LoginUser } from "./components/LoginUser/LoginUser";
import { OrderForm } from "./components/OrderForm/OrderForm";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { saveUser } from "./store/userSlice";

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

  const handleSaveDesign = async () => {
    await createDesignByUserId("design-4");
  };

  const userId = useSelector(
    (state: RootState) => state.user.userAccount.user_id
  );
  const username = useSelector(
    (state: RootState) => state.user.userAccount.username
  );

  return (
    <>
      <p>
        User_id: {userId}, Username: {username}
      </p>
      <ProgressBar />
      <RegisterUser />
      <LoginUser />
      <OrderForm />
      <button onClick={handleSaveDesign}>Save Design</button>
    </>
  );
}

export default App;
