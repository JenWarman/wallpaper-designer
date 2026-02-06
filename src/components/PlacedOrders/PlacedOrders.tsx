import { useEffect, useState } from "react";
import styles from "./PlacedOrders.module.scss";
import {
  fetchDesignsByUserId,
  fetchOrderByUserId,
} from "../../supabase/supabase";
import { type SavedDesign, type SavedOrder } from "../../types/types";
import { Link, useNavigate } from "react-router";
import { dataTestIds } from "../../utils/dataTestIds";
import { Card } from "../Card/Card";

export function PlacedOrders() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const navigate = useNavigate();

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
    <div
      className={styles.placedOrders__container}
      data-testid={dataTestIds.placedOrders}
    >
      <h1 className={styles.placedOrders__heading}>Your Orders</h1>
      {orders.length === 0 && (
        <>
          <p>You don't have any orders yet.</p>
          <p>
            {" "}
            Get started <Link to={"/design"}>here.</Link>
          </p>
        </>
      )}
      <div className={styles.placedOrders__cardContainer}>
        {orders.map((order) => {
          const design = designs.find(
            (design) => design.design_url === order.design,
          );
          if (!design) return null;
          return (
            <Card
              key={design.created_at}
              handleClick={() =>
                navigate(`/order-tracking?${design.design_url}`)
              }
              design_url={design.design_url}
              created_at={design.created_at}
              message="ordered: "
            />
          );
        })}
      </div>
    </div>
  );
}
