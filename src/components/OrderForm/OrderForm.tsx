import { useActionState} from "react";
import styles from "./OrderForm.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { FormState } from "../../types/types";
import {
  handleCalculatePrice,
} from "../../utils/formActions";
import { dataTestIds } from "../../utils/dataTestIds";

export function OrderForm() {

  const [state, action, isPending] = useActionState<FormState, FormData>(
    handleCalculatePrice,
    {}
  );

  const handlePlaceOrder = () => {
    console.log("placing order...")
  }

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
          {isPending && <p>Ordering...</p>}
          {state.message}
        </div>
      </Form>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
