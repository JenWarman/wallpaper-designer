import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { calculateImageScale } from "../../utils/calculateImageScale";
import conditionalClassNames from "../../utils/conditionalClassNames";
import { dataTestIds } from "../../utils/dataTestIds";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./DesignDemo.module.scss";

export function DesignDemo() {
  const { formData } = useDesignSearchParams();

  const imageScale = calculateImageScale("demo", formData.scale)

  const showImage = formData.motif && !formData.repeat;
  const showPattern = formData.repeat;

  const designDemoClassname = conditionalClassNames({
    [styles.designDemo__preview]: true,
    [styles.designDemo__pink]: formData.colour === "powder pink",
    [styles.designDemo__blue]: formData.colour === "cornflower blue",
    [styles.designDemo__charcoal]: formData.colour === "charcoal",
    [styles.designDemo__green]: formData.colour === "forest green",
  });

  return (
    <div className={styles.designDemo} data-testid={dataTestIds.designDemo}>

      <div className={styles.designDemo__container}>
        {showImage && (
        <div className={designDemoClassname}>
          <img
            style={{ width: `${imageScale}`, height: `${imageScale}`, marginBottom: `5rem` }}
            src={`src/assets/${formData.motif}.png`}
            alt={formData.motif}
          />
        </div>
      ) }
      
      {showPattern && ( 
          <div className={styles.designDemo__container}>
          <PatternDesign design={formData} component="demo"/>
          </div>
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
