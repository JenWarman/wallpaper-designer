import { useEffect, useState } from "react";
import {
  fetchDesignsByUserId,
  fetchProgressStatusByDesign,
} from "../../supabase/supabase";
import styles from "./OrderTracking.module.scss";
import type { DesignData } from "../../types/types";
import { PatternDesign } from "../PatternDesign/PatternDesign";

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
      console.log(designs.data);
      designs.data?.map((design) => {
        if (design.design_url === designUrl) {
          setDesign(design.design_data);
        }
      });
      setStatus(status?.status[0].status);
      setDate(status?.status[0].created_at);
    })();
  }, [designUrl]);

  console.log(design);
  return (
    <div className={styles.orderTracking__container}>
      <div className={styles.orderTracking__pattern}>
        <PatternDesign design={design} component="saved" />
      </div>
      <div className={styles.orderTracking__status}>
        <div className={styles.orderTracking__side}></div>
        <div className={styles.orderTracking__detail}>
          <p>{status}</p>
          <p>{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

//fetch progress status by design_url
//fetch order and match url
//design and match url for PatternDesign
