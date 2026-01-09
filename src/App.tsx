import { useEffect } from "react";
import "./App.css";
import { RegisterUser } from "./components/RegisterUser/RegisterUser";
import {
  createDesignByUserId,
  getUserSession,
} from "./supabase/supabase";
import { LoginUser } from "./components/LoginUser/LoginUser";
import { OrderForm } from "./components/OrderForm/OrderForm";
// import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "./store/userSlice";
import { getUserId, getUsername } from "./store/selectors/userSelector";
import { Cta } from "./components/Cta/Cta";
import { dataTestIds } from "./utils/dataTestIds";

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

  const userId = useSelector(getUserId);
  const username = useSelector(getUsername);

  return (
    <>
      <p>
        User_id: {userId}, Username: {username}
      </p>
      {/* <ProgressBar /> */}
     <RegisterUser /> 
      {/* <LoginUser />  */}
      {/* <OrderForm /> */}
      <Cta ctaFunction={handleSaveDesign} dataTestId={dataTestIds.cta} label="Save Design" ariaLabel="save your design" type="button"/>
    </>
  );
}

export default App;
