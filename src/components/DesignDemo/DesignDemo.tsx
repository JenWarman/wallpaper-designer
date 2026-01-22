import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { calculateImageScale } from "../../utils/calculateImageScale";
import { dataTestIds } from "../../utils/dataTestIds";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./DesignDemo.module.scss";

export function DesignDemo() {
  const { formData } = useDesignSearchParams();

  const imageScale = calculateImageScale("demo", formData.scale)

  return (
    <div className={styles.designDemo} data-testid={dataTestIds.designDemo}>

      <div className={styles.designDemo__container}>
        {formData.motif && !formData.repeat && (
        <div className={styles.designDemo__container}>
          <img
            style={{ width: `${imageScale}`, height: `${imageScale}`, marginBottom: `5rem` }}
            src={`src/assets/${formData.motif}.png`}
            alt={formData.motif}
          />
        </div>
      ) }
      
      {formData.repeat && ( 
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
