import { useState } from "react";
import { updateOrderByUserId } from "../../supabase/supabase";
import styles from "./OrderForm.module.scss";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export function OrderForm() {
  const [measurement, setMeasurement] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [design, setDesign] = useState("DESIGN-1");

  const handleUpdateOrder = async () => {
    await updateOrderByUserId(3, 240.79, design);
  };

  const handleCalculatePrice = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log("calculate price");
  };

  return (
    <div className={styles.container}>
      <h4>Your Design: {design}</h4>
      <Form onSubmit={handleCalculatePrice} ctaLabel="Get Price">
        <Input
          type="radio"
          id="cms"
          value="cms"
          onChange={() => setMeasurement("cms")}
          ariaLabel="select cms as measurment"
          label="cms"
        />
        <Input
          type="radio"
          id="inches"
          value="inches"
          onChange={() => setMeasurement("inches")}
          ariaLabel="select inches as measurment"
          label="inches"
        />
        <Input
          type="number"
          value={width}
          id="width"
          onChange={(event) => setWidth(event.target.value)}
          ariaLabel="width of wall"
          label="Width of Wall"
        />
        <Input
          type="number"
          value={height}
          id="height"
          onChange={(event) => setHeight(event.target.value)}
          ariaLabel="height of wall"
          label="height of Wall"
        />
      </Form>
      <div>
        <p>Our Price: </p>
        <p>£388.75</p>
      </div>
      <button onClick={handleUpdateOrder}>Order</button>
    </div>
  );
}
