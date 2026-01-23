import { useEffect, useState } from "react";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./PlacedOrders.module.scss";
import {
  fetchDesignsByUserId,
  fetchOrderByUserId,
} from "../../supabase/supabase";
import { type SavedDesign, type SavedOrder } from "../../types/types";
import { useNavigate } from "react-router";

export function PlacedOrders() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const orders = await fetchOrderByUserId();
      const designs = await fetchDesignsByUserId();

      if (!orders || !designs) return;

      setOrders(orders.data ?? []);
      setDesigns(designs.data ?? []);
    })();
  }, []);

  return (
    <div className={styles.placedOrders__container}>
      <h1 className={styles.placedOrders__heading}>Your Orders</h1>
      <div className={styles.placedOrders__cardContainer}>
        {orders.map((order) => {
          const design = designs.find(
            (design) => design.design_url === order.design,
          );
          if (!design) return null;
          return (
            <div className={styles.placedOrders__card} key={order.created_at}>
              <div
                className={styles.placedOrders__pattern}
                key={design.created_at}
                onClick={() => navigate(`/order-tracking?${design.design_url}`)}
              >
                <PatternDesign design={design.design_data} component="saved" />
              </div>
              <p className={styles.placedOrders__text}>
                Ordered: {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
