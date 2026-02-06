import { useNavigate } from "react-router";
import styles from "./Order.module.scss";
import { updateOrderByUserId } from "../../supabase/supabase";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import { dataTestIds } from "../../utils/dataTestIds";
import { parseDesignUrl } from "../../utils/parseDesignUrl";
import type { OrderProps } from "../../types/types";


export function Order({ order, designUrl }: OrderProps) {
  const { quantity, price } = order;
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    await updateOrderByUserId(quantity, price, designUrl);
    navigate("/your-orders");
  };

  const designObj = parseDesignUrl(designUrl)
  return (
    <div className={styles.order__container} data-testid={dataTestIds.order}>
      <div className={styles.order__pattern}>
        <PatternDesign design={designObj} component="saved" />
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
