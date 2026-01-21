import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { calculateBackgroundPosition } from "../../utils/calculateBackgroundPosition";
import { calculateImageScale } from "../../utils/calculateImageScale";
import conditionalClassNames from "../../utils/conditionalClassNames";
import { dataTestIds } from "../../utils/dataTestIds";
import styles from "./DesignTile.module.scss";

export function DesignTile() {
  const { formData } = useDesignSearchParams();

  const designTileClassName = conditionalClassNames({
    [styles.designTile__container]: true,
    [styles.designTile__pink]: formData.colour === "pink",
    [styles.designTile__blue]: formData.colour === "blue",
  });

  const imageScale = calculateImageScale("tile", formData.scale)

  const bgPosition = calculateBackgroundPosition(
    formData.motif,
    formData.scale,
    "tile"
  );

  return (
    <div className={styles.designTile} data-testid={dataTestIds.designTile}>
      {!formData.theme && (
         <div className={designTileClassName}>
        <h1 className={styles.designTile__header}>Your Design Here</h1>
         </div>
      )}

      {formData.motif && !formData.repeat ? (
        <div className={designTileClassName}>
          <img
            style={{ width: `${imageScale}`, height: `${imageScale}` }}
            src={`src/assets/${formData.motif}.png`}
            alt={formData.motif}
          />
        </div>
      ) : formData.repeat === "tile" ? (
        <div
          className={designTileClassName}
          style={{
            backgroundImage: `url(${`"/src/assets/${formData.motif}.png"`})`,
            backgroundPosition: `0 0, ${bgPosition.positionOne} ${bgPosition.positionTwo} `,
            backgroundSize: `${imageScale} auto`
          }}
        ></div>
      ) : (
        <div
          className={designTileClassName}
          style={{
            backgroundImage: `url(${`"/src/assets/${formData.motif}_bg.png"`}), url(${`"/src/assets/${formData.motif}_bg.png"`})`,
            backgroundPosition: `0 0, ${bgPosition.positionOne} ${bgPosition.positionTwo} `, backgroundSize: `${imageScale} auto`
          }}
        ></div>
      )}
    </div>
  );
}
