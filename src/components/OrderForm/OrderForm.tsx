import { useActionState, useState } from "react";
import styles from "./OrderForm.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import type { FormState } from "../../types/types";
import { handleUpdateOrder } from "../../utils/formActions";

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
    <div className={styles.container}>
      <h3 className={styles.heading}>Your Design: "Design-1"</h3>
      <Form action={action} ctaLabel="Order">
        <Input
          type="radio"
          id="cms"
          onChange={() => setMeasurement("cms")}
          ariaLabel="select cms as measurment"
          label="cms"
          name="cms"
        />
        <Input
          type="radio"
          id="inches"
          onChange={() => setMeasurement("inches")}
          ariaLabel="select inches as measurment"
          label="inches"
          name="inches"
        />
        <Input
          type="number"
          name="width"
          id="width"
          ariaLabel="width of wall"
          label="Width of Wall"
        />
        <Input
          type="number"
          id="height"
          ariaLabel="height of wall"
          label="height of Wall"
          name="height"
        />
        <button onClick={handleCalculatePrice}>Calculate Price</button>
        {isPending && <p>Ordering...</p>}
        {state.message}
      </Form>
      <div>
        <p>Our Price: </p>
        <p>£388.75</p>
      </div>
    </div>
  );
}
