import { useActionState, useEffect, useState } from "react";
import styles from "./OrderForm.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { OrderFormState } from "../../types/types";
import { handleCalculatePrice } from "../../utils/formActions";
import { dataTestIds } from "../../utils/dataTestIds";
import { updateOrderByUserId } from "../../supabase/supabase";
import { Cta } from "../Cta/Cta";
import { useDispatch, useSelector } from "react-redux";
import { orderPlaced } from "../../store/orderSlice";
import { getOrderPlaced } from "../../store/selectors/userSelector";

export function OrderForm() {
  const [formData, setFormData] = useState({
    width: "",
    height: "",
    measurement: "",
  });

  const dispatch = useDispatch();

  const [state, action, isPending] = useActionState<OrderFormState, FormData>(
    handleCalculatePrice,
    { quantity: 0, price: 0 }
  );

  const handlePlaceOrder = async () => {
    await updateOrderByUserId(state.quantity, state.price, "design-1");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.type === "radio" ? "measurement" : event.target.name]:
        event.target.value,
    }));
  };

  const readyToCalculate =
    formData.width.trim() !== "" &&
    formData.height.trim() !== "" &&
    formData.measurement.trim() !== "";

  useEffect(() => {
    if (state.price > 0 && state.quantity > 0) {
      dispatch(orderPlaced());
    }
  }, [state.price, state.quantity, dispatch]);

  const readyToOrder = useSelector(getOrderPlaced)

  return (
    <div className={styles.orderForm__container}>
      <h3 className={styles.orderForm__heading}>Your Design: "Design-1"</h3>
      <Form
        action={action}
        ctaLabel="Calculate Price"
        dataTestId={dataTestIds.form}
        ctaAriaLabel="calculate price of wallpaper"
        ctaDisabled={!readyToCalculate || isPending}
      >
        <div className={styles.orderForm__radio}>
          <Input
            type="radio"
            id="cms"
            ariaLabel="select cms as measurment"
            label="cms"
            name="measurement"
            dataTestId={dataTestIds.input}
            onChange={handleChange}
          />
          <Input
            type="radio"
            id="inches"
            ariaLabel="select inches as measurment"
            label="inches"
            name="measurement"
            dataTestId={dataTestIds.input}
            onChange={handleChange}
          />
        </div>
        <Input
          type="number"
          name="width"
          id="width"
          ariaLabel="width of wall"
          label="Width of Wall"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
        />
        <Input
          type="number"
          id="height"
          ariaLabel="height of wall"
          label="height of Wall"
          name="height"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
        />
        <p className={styles.orderForm__link}>Measuring Guide</p>

        <div>
          {isPending && <p>Calculating...</p>}
          {state.message}
        </div>
      </Form>
      <Cta
        ctaFunction={handlePlaceOrder}
        label="Order"
        ariaLabel="Place order"
        type="button"
        dataTestId={dataTestIds.cta}
        disabled={!readyToOrder}
      />
    </div>
  );
}
