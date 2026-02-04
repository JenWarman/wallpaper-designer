import type { CardProps} from "../../types/types";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./Card.module.scss";

export function Card({ handleClick, design_data, created_at, message, design_url }: CardProps) {
 
  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.card__pattern}>
        <PatternDesign design={design_data} component="saved" />
      </div>
      <div className={styles.card__text}>
        <p className={styles.card__name}>
          {design_data.theme} wallpaper with {design_data.motif} pattern.
        </p>
        <p className={styles.card__edit}>
          {message}{new Date(created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
