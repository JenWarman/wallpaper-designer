import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";
import { fetchProgressStatusByDesign } from "../../supabase/supabase";

export function ProgressBar() {
const [progressStatus, setProgressStatus] = useState('design')

  useEffect(() => {
    (async () => {
      const progressStatus = await fetchProgressStatusByDesign("DESIGN-1");
      if (!progressStatus) return;
      if (progressStatus) {
        setProgressStatus(progressStatus?.status[0].status)
        // console.log(progressStatus)
        // console.log(progressStatus?.status[0].status, "progress status");
      }
    })();
  }, [progressStatus]);

  return (
    <div className={styles.container}>
      <h3>Progress of this design: {progressStatus} </h3>
    </div>
  );
}
