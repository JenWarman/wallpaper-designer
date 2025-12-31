import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";
import { fetchProgressStatusByDesign } from "../../supabase/supabase";

export function ProgressBar() {
const [progressStatus, setProgressStatus] = useState('')

  useEffect(() => {
    (async () => {
      const progressStatus = await fetchProgressStatusByDesign();
      if (!progressStatus) return;
      if (progressStatus) {
        setProgressStatus(progressStatus?.status[0].status)
        console.log(progressStatus?.status[0].status, "progress status");
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Progress of this design: {progressStatus} </h1>
    </div>
  );
}
