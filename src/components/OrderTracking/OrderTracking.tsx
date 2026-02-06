import { useEffect, useState } from "react";
import {
  fetchDesignsByUserId,
  fetchProgressStatusByDesign,
} from "../../supabase/supabase";
import styles from "./OrderTracking.module.scss";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import { statusUpdates } from "../../utils/statusUpdates";
import { dataTestIds } from "../../utils/dataTestIds";
import { parseDesignUrl } from "../../utils/parseDesignUrl";

export function OrderTracking() {
  const [statuses, setStatuses] = useState<
    { status: string; created_at: string }[]
  >([]);

  const designUrl = window.location.href.split("/order-tracking?")[1];

  useEffect(() => {
    (async () => {
      const status = await fetchProgressStatusByDesign(designUrl);
      const designs = await fetchDesignsByUserId();

      if (!status || !designs) return;
      setStatuses(status?.status ?? []);
    })();
  }, [designUrl]);

  const designObj = parseDesignUrl(designUrl)
  return (
    <div className={styles.orderTracking__container}    data-testid={dataTestIds.orderTracking}>
      <div className={styles.orderTracking__pattern}>
        <PatternDesign design={designObj} component="saved" />
      </div>
      <div className={styles.orderTracking__detail}>
        {Object.entries(statusUpdates).map(([key, value]) => {
          const entry = statuses.find(
            (status) => status.status.toLowerCase() === key.toLowerCase(),
          );
            return (
              <div className={styles.orderTracking__stage} key={key}>
                <div className={styles.orderTracking__shapes}>
                  <div className={entry ? `${styles.orderTracking__circle}` : `${styles.orderTracking__circleFuture}`}></div>
                  <div className={entry ? `${styles.orderTracking__line}` : `${styles.orderTracking__lineFuture}`}></div>
                </div>
                <div className={styles.orderTracking__info}>
                  <p className={entry ? `${styles.orderTracking__text}` : `${styles.orderTracking__textFuture}`}>{entry? value.update : "To be confirmed..."}</p>
                  <p className={styles.orderTracking__date}>
                    {entry ? new Date(entry.created_at).toLocaleDateString() : ""}
                  </p>
                </div>
              </div>
            );
        })
        }
      </div>
    </div>
  );
}
