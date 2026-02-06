import type { CardProps} from "../../types/types";
import { parseDesignUrl } from "../../utils/parseDesignUrl";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./Card.module.scss";

export function Card({ handleClick, design_url, created_at, message }: CardProps) {

  const designObj = parseDesignUrl(design_url)
 
  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.card__pattern}>
        <PatternDesign design={designObj} component="saved" />
      </div>
      <div className={styles.card__text}>
        <p className={styles.card__name}>
          {designObj.theme} wallpaper with {designObj.motif} pattern.
        </p>
        <p className={styles.card__edit}>
          {message}{new Date(created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
