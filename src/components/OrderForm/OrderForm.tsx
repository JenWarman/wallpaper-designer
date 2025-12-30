import { useState } from "react";
import { updateOrderByUserId } from "../../supabase/supabase";
import styles from "./OrderForm.module.scss";

export function OrderForm() {
  const [measurement, setMeasurement] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [design, setDesign] = useState('DESIGN-10')

  const handleUpdateOrder = async () => {
    const orders = await updateOrderByUserId(5, 350.79);
    console.log("ORDER", orders);
  };

  return (
    <div className={styles.container}>
        <h4>Your Design: {design}</h4>
      <form action="">
        <div>
          <input type="radio" name="cms" id="cms" onChange={() => setMeasurement('cms')}/>
          <label htmlFor="cms">cms</label>
          <input type="radio" name="inches" id="inches" onChange={() => setMeasurement('inches')}/>
          <label htmlFor="inches">inches</label>
        </div>
        <div>
          <label htmlFor="width">Width of Wall</label>
          <input type="number" value={width} onChange={(event) => setWidth(event.target.valueAsNumber)}/>
        </div>
        <div>
          <label htmlFor="height">Height of Wall</label>
          <input type="number" value={height} onChange={(event) => setHeight(event.target.valueAsNumber)} />
        </div>
        <button>Get Price</button>
        <div>
          <p>Our Price: </p>
          <p>£388.75</p>
        </div>
        <button onClick={handleUpdateOrder}>Order</button>
      </form>
    </div>
  );
}
