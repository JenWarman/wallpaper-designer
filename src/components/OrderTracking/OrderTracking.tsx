import { useEffect, useState } from "react";
import {
  fetchDesignsByUserId,
  fetchProgressStatusByDesign,
} from "../../supabase/supabase";
import styles from "./OrderTracking.module.scss";
import type { DesignData } from "../../types/types";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import { statusUpdates } from "../../utils/statusUpdates";

export function OrderTracking() {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [design, setDesign] = useState<DesignData>({
    theme: "",
    motif: "",
    scale: "",
    colour: "",
    repeat: "",
  });

  const designUrl = window.location.href.split("/order-tracking?")[1];

  useEffect(() => {
    (async () => {
      const status = await fetchProgressStatusByDesign(designUrl);
      const designs = await fetchDesignsByUserId();
      if (!status || !designs) return;

      designs.data?.map((design) => {
        if (design.design_url === designUrl) {
          setDesign(design.design_data);
        }
      });
      setStatus(status?.status[0].status.trim().toLowerCase());
      setDate(status?.status[0].created_at);
    })();
  }, [designUrl]);


  return (
    <div className={styles.orderTracking__container}>
      <div className={styles.orderTracking__pattern}>
        <PatternDesign design={design} component="saved" />
      </div>
      <div className={styles.orderTracking__detail}>
        {Object.entries(statusUpdates).map(([key, value]) => (
          <div className={styles.orderTracking__stage} key={key}>
            <div className={styles.orderTracking__shapes}>
              <div className={styles.orderTracking__circle}></div>
              <div className={styles.orderTracking__line}></div>
            </div>
            <div className={styles.orderTracking__info}>
              <p className={styles.orderTracking__text}>
                {key === status ? value.update : "To Be Confirmed..."}
              </p>
              <p className={styles.orderTracking__text}>
                {key === status ? new Date(date).toLocaleDateString(): ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
