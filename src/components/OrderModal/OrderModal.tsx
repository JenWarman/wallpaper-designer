import { useNavigate } from "react-router";
import { updateOrderByUserId } from "../../supabase/supabase";
import styles from "./OrderModal.module.scss";
import type { DesignData } from "../../types/types";
import { PatternDesign } from "../PatternDesign/PatternDesign";

type OrderModalProps = {
  order: {
    price: number;
    quantity: number;
  };
  design: DesignData;
  designUrl: string;
};

export function OrderModal({ order, designUrl, design }: OrderModalProps) {
  const { quantity, price } = order;
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    await updateOrderByUserId(quantity, price, designUrl);
    navigate("/");
  };

  return (
    <div className={styles.orderModal__container}>
      <div className={styles.orderModal__pattern}>
        <PatternDesign design={design} component="saved" />
      </div>
      <h1>Total Price: £{price}</h1>
      <p>Quantity: {quantity} rolls</p>

      <button
        className={styles.orderModal__cta}
        onClick={handlePlaceOrder}
        aria-label="Place order"
        type="button"
      >
        Order
      </button>
    </div>
  );
}
