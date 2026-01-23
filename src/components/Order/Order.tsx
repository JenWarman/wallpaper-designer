import { useNavigate } from "react-router";
import type { DesignData } from "../../types/types";
import styles from "./Order.module.scss";
import { updateOrderByUserId } from "../../supabase/supabase";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import { dataTestIds } from "../../utils/dataTestIds";

type OrderProps = {
  order: {
    price: number;
    quantity: number;
    design: DesignData;
  };
  designUrl: string;
};

export function Order({ order, designUrl }: OrderProps) {
  const { quantity, price, design } = order;
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    await updateOrderByUserId(quantity, price, designUrl);
    navigate("/your-orders");
  };

  return (
    <div className={styles.order__container} data-testid={dataTestIds.order}>
      <div className={styles.order__pattern}>
        <PatternDesign design={design} component="saved" />
      </div>
      <h1 className={styles.order__heading}>Total Price: <span className={styles.order__bold}>£{price}</span></h1>
      <p className={styles.order__text}>Quantity: {quantity} rolls</p>

      <div className={styles.order__ctas}>
        <button
          className={styles.order__cta}
          onClick={handlePlaceOrder}
          aria-label="Place order"
          type="button"
        >
          Order
        </button>
        <button
          className={styles.order__cta}
          onClick={() => navigate("/saved-designs")}
          aria-label="Place order"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
