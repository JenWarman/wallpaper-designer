import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { calculateBackgroundPositionLargeScale } from "../../utils/calculateBackgroundPosition";
import conditionalClassNames from "../../utils/conditionalClassNames";
import styles from "./DesignDemo.module.scss";

export function DesignDemo() {
  const { formData } = useDesignSearchParams();

  const designDemoClassName = conditionalClassNames({
    [styles.designDemo__container]: true,
    [styles.designDemo__pink]: formData["background-colour"] === "pink",
    [styles.designDemo__blue]: formData["background-colour"] === "blue",
  });

  const imageScale =
    formData.scale === "small"
      ? "10px"
      : formData.scale === "medium"
        ? "30px"
        : "60px";

  const bgPosition = calculateBackgroundPositionLargeScale(
    formData.motif,
    formData.scale,
  );

  return (
    <div className={styles.designDemo}>
      {/* container */}
      <div className={designDemoClassName}>
        {formData.motif && !formData.repeat ? (
        <div className={designDemoClassName}>
          <img
            style={{ width: `${imageScale}`, height: `${imageScale}` }}
            src={`src/assets/${formData.motif}.png`}
            alt={formData.motif}
          />
        </div>
      ) : formData.repeat === "tile" ? (
        <div
          className={designDemoClassName}
          style={{
            backgroundImage: `url(${`"/src/assets/${formData.motif}.png"`})`,
            backgroundPosition: `0 0, ${bgPosition.positionOne} ${bgPosition.positionTwo} `,
            backgroundSize: `${imageScale} auto`
          }}
        ></div>
      ) : (
        <div
          className={designDemoClassName}
          style={{
            backgroundImage: `url(${`"/src/assets/${formData.motif}_bg.png"`}), url(${`"/src/assets/${formData.motif}_bg.png"`})`,
            backgroundPosition: `0 0, ${bgPosition.positionOne} ${bgPosition.positionTwo} `, backgroundSize: `${imageScale} auto`
          }}
        ></div>
      )}
        {/* insitu image layer */}
        <img
          className={styles.designDemo__image}
          src={`src/assets/room.png`}
          alt="your wallpaper design in a living space"
        />
      </div>
    </div>
  );
}
