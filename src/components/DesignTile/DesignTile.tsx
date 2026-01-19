import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { calculateBackgroundPosition } from "../../utils/calculateBackgroundPosition";
import conditionalClassNames from "../../utils/conditionalClassNames";
import styles from "./DesignTile.module.scss";

export function DesignTile() {
  const { formData } = useDesignSearchParams();

  const designTileClassName = conditionalClassNames({
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
  );

  return (
    <div className={styles.designTile}>
      {!formData.theme && (
        <h1 className={styles.designTile__header}>Your Design Here</h1>
      )}

      {formData.motif && !formData.repeat ? (
        <div className={designTileClassName}>
          <img
            style={{ width: `${imageScale}`, height: `${imageScale}` }}
            src={`src/assets/${formData.motif}.png`}
            alt=""
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
