import { useActionState } from "react";
import styles from "./OrderForm.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { OrderFormState } from "../../types/types";
import { handleCalculatePrice } from "../../utils/formActions";
import { dataTestIds } from "../../utils/dataTestIds";
import { updateOrderByUserId } from "../../supabase/supabase";
import { Cta } from "../Cta/Cta";

export function OrderForm() {
  const [state, action, isPending] = useActionState<OrderFormState, FormData>(
    handleCalculatePrice,
    { quantity: 0, price: 0 }
  );

  const handlePlaceOrder = async () => {
    await updateOrderByUserId(state.quantity, state.price, "design-1");
  };

  return (
    <div className={styles.orderForm__container}>
      <h3 className={styles.orderForm__heading}>Your Design: "Design-1"</h3>
      <Form
        action={action}
        ctaLabel="Calculate Price"
        dataTestId={dataTestIds.form}
      >
        <div className={styles.orderForm__radio}>
          <Input
            type="radio"
            id="cms"
            ariaLabel="select cms as measurment"
            label="cms"
            name="cms"
            dataTestId={dataTestIds.input}
          />
          <Input
            type="radio"
            id="inches"
            ariaLabel="select inches as measurment"
            label="inches"
            name="inches"
            dataTestId={dataTestIds.input}
          />
        </div>
        <Input
          type="text"
          name="width"
          id="width"
          ariaLabel="width of wall"
          label="Width of Wall"
          dataTestId={dataTestIds.input}
        />
        <Input
          type="text"
          id="height"
          ariaLabel="height of wall"
          label="height of Wall"
          name="height"
          dataTestId={dataTestIds.input}
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
      />
    </div>
  );
}
