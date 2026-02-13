import type { ToastProps } from "../../types/types";
import { dataTestIds } from "../../utils/dataTestIds";
import styles from "./Toast.module.scss";

export function Toast({ message }: ToastProps) {
  return (
    <div className={styles.toast__container} data-testid={dataTestIds.toast}>
      {message}
    </div>
  );
}
