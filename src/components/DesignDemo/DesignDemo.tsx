import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { calculateBackgroundPosition} from "../../utils/calculateBackgroundPosition";
import { calculateImageScale } from "../../utils/calculateImageScale";
import conditionalClassNames from "../../utils/conditionalClassNames";
import { dataTestIds } from "../../utils/dataTestIds";
import styles from "./DesignDemo.module.scss";

export function DesignDemo() {
  const { formData } = useDesignSearchParams();

  const designDemoClassName = conditionalClassNames({
    [styles.designDemo__container]: true,
    [styles.designDemo__pink]: formData.colour === "pink",
    [styles.designDemo__blue]: formData.colour === "blue",
  });

  const imageScale = calculateImageScale("demo", formData.scale)

  const bgPosition = calculateBackgroundPosition(
    formData.motif,
    formData.scale,
    "demo"
  );

  return (
    <div className={styles.designDemo} data-testid={dataTestIds.designDemo}>
        
      {/* container */}
      <div className={designDemoClassName}>
        {formData.motif && !formData.repeat ? (
        <div className={designDemoClassName}>
          <img
            style={{ width: `${imageScale}`, height: `${imageScale}`, marginBottom: `5rem` }}
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
