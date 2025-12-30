import { useState } from "react";
import { updateOrderByUserId } from "../../supabase/supabase";
import styles from "./OrderForm.module.scss";

export function OrderForm() {
  const [measurement, setMeasurement] = useState("");
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [design, setDesign] = useState('DESIGN-1')

  const handleUpdateOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const orders = await updateOrderByUserId(3, 240.79, design);
    console.log("ORDER", orders);
  };

  return (
    <div className={styles.container}>
        <h4>Your Design: {design}</h4>
      <form action="" onSubmit={handleUpdateOrder}>
        <div>
          <input type="radio" name="cms" id="cms" onChange={() => setMeasurement('cms')}/>
          <label htmlFor="cms">cms</label>
          <input type="radio" name="inches" id="inches" onChange={() => setMeasurement('inches')}/>
          <label htmlFor="inches">inches</label>
        </div>
        <div>
          <label htmlFor="width">Width of Wall</label>
          <input type="number" value={width} onChange={(event) => setWidth(event.target.value)}/>
        </div>
        <div>
          <label htmlFor="height">Height of Wall</label>
          <input type="number" value={height} onChange={(event) => setHeight(event.target.value)} />
        </div>
        <button>Get Price</button>
        <div>
          <p>Our Price: </p>
          <p>£388.75</p>
        </div>
        <button>Order</button>
      </form>
    </div>
  );
}
