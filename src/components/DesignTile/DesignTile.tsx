import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import conditionalClassNames from "../../utils/conditionalClassNames";
import styles from "./DesignTile.module.scss";

export function DesignTile() {
  const { formData } = useDesignSearchParams();

  console.log(formData);

  const designTileClassName = conditionalClassNames({
    [styles.designTile__pink]: formData["background-colour"] === "pink",
    [styles.designTile__blue]: formData["background-colour"] === "blue",
    // [styles.designTile__daisy]: formData.motif === "daisy",
    [styles.designTile__small]: formData.scale === "small",
    [styles.designTile__medium]: formData.scale === "medium",
    [styles.designTile__large]: formData.scale === "large",
    [styles.designTile__tile]: formData.repeat === "tile" && formData.motif === "daisy",
    [styles.designTile__halfDrop]: formData.repeat === "half drop" && formData.motif === "daisy",
  });
  return (
    <div className={styles.designTile}>
      <div className={designTileClassName}>
        {!formData.theme && (
          <h1 className={styles.designTile__header}>Your Design Here</h1>
        )}
      </div>
    </div>
  );
}
