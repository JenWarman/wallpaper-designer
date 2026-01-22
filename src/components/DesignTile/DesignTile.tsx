import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { calculateImageScale } from "../../utils/calculateImageScale";
import { dataTestIds } from "../../utils/dataTestIds";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./DesignTile.module.scss";

export function DesignTile() {
  const { formData } = useDesignSearchParams();

  const imageScale = calculateImageScale("tile", formData.scale)

  return (
    <div className={styles.designTile} data-testid={dataTestIds.designTile}>
      {!formData.theme && (
         <div className={styles.designTile__container}>
        <h1 className={styles.designTile__header}>Your Design Here</h1>
         </div>
      )}

      {formData.motif && !formData.repeat && (
        <div className={styles.designTile__container}>
          <img
            style={{ width: `${imageScale}`, height: `${imageScale}` }}
            src={`src/assets/${formData.motif}.png`}
            alt={formData.motif}
          />
        </div>
        )}

        {formData.repeat && ( 
          <div className={styles.designTile__container}>
          <PatternDesign design={formData} component="tile"/>
          </div>
        )}
    </div>
  );
}
