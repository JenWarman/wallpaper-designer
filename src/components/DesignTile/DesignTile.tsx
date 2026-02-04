import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { calculateImageScale } from "../../utils/calculateImageScale";
import conditionalClassNames from "../../utils/conditionalClassNames";
import { dataTestIds } from "../../utils/dataTestIds";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./DesignTile.module.scss";

export function DesignTile() {
  const { formData } = useDesignSearchParams();

  const imageScale = calculateImageScale("tile", formData.scale)

  const showPlaceholderText = !formData.theme;
  const showImage = formData.motif && !formData.repeat;
  const showPattern = formData.repeat;

  const designTileClassname = conditionalClassNames({
    [styles.designTile__preview]: true,
    [styles.designTile__pink]: formData.colour === "pink",
    [styles.designTile__blue]: formData.colour === "blue",
  });

  return (
    <div className={styles.designTile} data-testid={dataTestIds.designTile}>
      {showPlaceholderText && (
         <div className={styles.designTile__container}>
        <h1 className={styles.designTile__header}>Your Design Here</h1>
         </div>
      )}

      {showImage &&(
        <div className={designTileClassname}>
          <img
            style={{ width: `${imageScale}`, height: `${imageScale}` }}
            src={`src/assets/${formData.motif}.png`}
            alt={formData.motif}
          />
        </div>
        )}

        {showPattern && ( 
          <div className={styles.designTile__container}>
          <PatternDesign design={formData} component="tile"/>
          </div>
        )}
    </div>
  );
}
