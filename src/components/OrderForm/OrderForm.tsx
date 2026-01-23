import { useActionState, useEffect, useState } from "react";
import styles from "./OrderForm.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { OrderFormState } from "../../types/types";
import { handleCalculatePrice } from "../../utils/forms/formActions";
import { dataTestIds } from "../../utils/dataTestIds";
import { fetchDesignsByUserId } from "../../supabase/supabase";
import { validateMeasurement } from "../../utils/forms/formValidation";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import { Order } from "../Order/Order";

export function OrderForm() {
  const [formData, setFormData] = useState({
    width: "",
    height: "",
    measurement: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [readyToOrder, setReadyToOrder] = useState(false);
  const [orderData, setOrderData] = useState({
    quantity: 0,
    price: 0,
    design: { theme: "", motif: "", scale: "", colour: "", repeat: "" },
  });

  const designUrl = window.location.href.split("/order?")[1];

  const [state, action, isPending] = useActionState<OrderFormState, FormData>(
    handleCalculatePrice,
    { quantity: 0, price: 0 },
  );

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
    (async () => {
      const result = await fetchDesignsByUserId();
      if (!result) return;
      result.data?.map((design) => {
        if (design.design_url === window.location.href.split("/order?")[1]) {
          setOrderData({
            quantity: state.quantity,
            price: state.price,
            design: design.design_data,
          });
        }
      });
      if (state.price > 0 && state.quantity > 0) {
        setReadyToOrder(true);
      }
    })();
  }, [state.price, state.quantity]);

  return (
    <div className={styles.orderForm__container} data-testid={dataTestIds.orderForm}>
      {!readyToOrder && (
        <>
          <div className={styles.orderForm__pattern}>
            <PatternDesign design={orderData.design} component="saved" />
          </div>
          <h1 className={styles.orderForm__heading}>Order Your Wallpaper</h1>
          <Form
            action={action}
            ctaLabel="Get Price"
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
          </Form>
          <div className={styles.orderForm__price}>
            {isPending && <p>Calculating...</p>}
          </div>
        </>
      )}

      {readyToOrder && <Order order={orderData} designUrl={designUrl} />}
    </div>
  );
}
