import { useActionState, useState } from "react";
import styles from "./OrderForm.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { FormState } from "../../types/types";
import { handleUpdateOrder } from "../../utils/formActions";
import { dataTestIds } from "../../utils/dataTestIds";

export function OrderForm() {
  const [measurement, setMeasurement] = useState("");

  const [state, action, isPending] = useActionState<FormState, FormData>(
    handleUpdateOrder,
    {}
  );

  const handleCalculatePrice = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log("calculate price");
  };

  return (
    <div className={styles.orderForm__container}>
      <h3 className={styles.orderForm__heading}>Your Design: "Design-1"</h3>
      <Form action={action} ctaLabel="Order" dataTestId={dataTestIds.form}>
        <div className={styles.orderForm__radio}>
        <Input
          type="radio"
          id="cms"
          onChange={() => setMeasurement("cms")}
          ariaLabel="select cms as measurment"
          label="cms"
          name="cms"
          dataTestId={dataTestIds.input}
        />
        <Input
          type="radio"
          id="inches"
          onChange={() => setMeasurement("inches")}
          ariaLabel="select inches as measurment"
          label="inches"
          name="inches"
          dataTestId={dataTestIds.input}
        />
        </div>
        <Input
          type="number"
          name="width"
          id="width"
          ariaLabel="width of wall"
          label="Width of Wall"
          dataTestId={dataTestIds.input}
        />
        <Input
          type="number"
          id="height"
          ariaLabel="height of wall"
          label="height of Wall"
          name="height"
          dataTestId={dataTestIds.input}
        />
        <p className={styles.ordefForm__link}>Measuring Guide</p>
        <button onClick={handleCalculatePrice}>Calculate Price</button>
        <div>
          <p>Our Price: </p>
          <p>£388.75</p>
        </div>
        {isPending && <p>Ordering...</p>}
        {state.message}
      </Form>
    </div>
  );
}
