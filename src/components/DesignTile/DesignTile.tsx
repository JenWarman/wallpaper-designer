import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { calculateBackgroundPosition } from "../../utils/calculateBackgroundPosition";
import conditionalClassNames from "../../utils/conditionalClassNames";
import { dataTestIds } from "../../utils/dataTestIds";
import styles from "./DesignTile.module.scss";

export function DesignTile() {
  const { formData } = useDesignSearchParams();

  const designTileClassName = conditionalClassNames({
    [styles.designTile__container]: true,
    [styles.designTile__pink]: formData["background-colour"] === "pink",
    [styles.designTile__blue]: formData["background-colour"] === "blue",
  });

  const imageScale =
    formData.scale === "small"
      ? "100px"
      : formData.scale === "medium"
        ? "150px"
        : "200px";


  const bgPosition = calculateBackgroundPosition(
    formData.motif,
    formData.scale,
    "small"
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
