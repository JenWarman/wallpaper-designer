import { useState } from "react";
import { DesignDemo } from "../DesignDemo/DesignDemo";
import { DesignTile } from "../DesignTile/DesignTile";
import styles from "./DesignContainer.module.scss";
import { dataTestIds } from "../../utils/dataTestIds";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function DesignContainer() {
  const [direction, setDirection] = useState<"left" | "right">("left");

  const isDesktop = useMediaQuery("(min-width: 1200px)");

  return (
    <div
      className={styles.designContainer__container}
      data-testid={dataTestIds.designContainer}
    >
      {isDesktop ? (
        <>
          <div className={styles.designContainer__tile}>
            <DesignTile />
          </div>
          <div className={styles.designContainer__demo}>
            <DesignDemo />
          </div>
        </>
      ) : (
        <>
          {direction === "left" && (
            <div className={styles.designContainer__tile}>
              <DesignTile />
              <img
                onClick={() => setDirection("right")}
                className={styles.designContainer__right}
                src="src/assets/right.png"
                alt=""
                data-testid={dataTestIds.right}
              />
            </div>
          )}

          {direction === "right" && (
            <div className={styles.designContainer__demo}>
              <img
                onClick={() => setDirection("left")}
                className={styles.designContainer__left}
                src="src/assets/left.png"
                alt=""
                data-testid={dataTestIds.left}
              />
              <DesignDemo />
            </div>
          )}
        </>
      )}
    </div>
  );
}
