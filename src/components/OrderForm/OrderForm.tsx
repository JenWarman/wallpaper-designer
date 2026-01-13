import { useActionState, useEffect, useState } from "react";
import styles from "./OrderForm.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { OrderFormState } from "../../types/types";
import { handleCalculatePrice } from "../../utils/forms/formActions";
import { dataTestIds } from "../../utils/dataTestIds";
import {
  updateOrderByUserId,
} from "../../supabase/supabase";
import { Cta } from "../Cta/Cta";
import { useDispatch, useSelector } from "react-redux";
import { orderPlaced } from "../../store/orderSlice";
import { getOrderPlaced } from "../../store/selectors/userSelector";
import { validateMeasurement } from "../../utils/forms/formValidation";

export function OrderForm() {
  const [formData, setFormData] = useState({
    width: "",
    height: "",
    measurement: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ordered, setOrdered] = useState(false);

  const dispatch = useDispatch();

  const [state, action, isPending] = useActionState<OrderFormState, FormData>(
    handleCalculatePrice,
    { quantity: 0, price: 0 }
  );

  const handlePlaceOrder = async () => {
    await updateOrderByUserId(state.quantity, state.price, "design-1");
    setOrdered(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.type === "radio" ? "measurement" : event.target.name]:
        event.target.value,
    }));
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    let errorMessage = "";
    switch (event.target.name) {
      case "width":
        errorMessage = validateMeasurement(event.target.value);
        break;
      case "height":
        errorMessage = errorMessage = validateMeasurement(event.target.value);
        break;
      default:
        errorMessage = "Please enter a valid measurements";
    }
    setErrors((prev) => ({
      ...prev,
      [event?.target.name]: errorMessage,
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

  const readyToOrder = useSelector(getOrderPlaced);

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
            onBlur={handleBlur}
          />
          <Input
            type="radio"
            id="inches"
            ariaLabel="select inches as measurment"
            label="inches"
            name="measurement"
            dataTestId={dataTestIds.input}
            onChange={handleChange}
            onBlur={handleBlur}
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
          onBlur={handleBlur}
        />
        {errors && <span className="error">{errors.width}</span>}
        <Input
          type="number"
          id="height"
          ariaLabel="height of wall"
          label="height of Wall"
          name="height"
          dataTestId={dataTestIds.input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && <span className="error">{errors.height}</span>}
        <div className={styles.orderForm__link}>
          <a href="">Measuring Guide</a>
        </div>
      </Form>
      <div className={styles.orderForm__price}>
        {isPending && <p>Calculating...</p>}
        {state.message}
      </div>
      <div className={styles.orderForm__cta}>
        <Cta
          ctaFunction={handlePlaceOrder}
          label="Order"
          ariaLabel="Place order"
          type="button"
          dataTestId={dataTestIds.cta}
          disabled={!readyToOrder}
        />
        {ordered && (
          <p className={styles.orderForm__message}>
            Your Order has been placed.
          </p>
        )}
      </div>
    </div>
  );
}
