import type { PatternDesignProps } from "../../types/types";
import { calculateBackgroundPosition } from "../../utils/calculateBackgroundPosition";
import { calculateImageScale } from "../../utils/calculateImageScale";
import conditionalClassNames from "../../utils/conditionalClassNames";
import { dataTestIds } from "../../utils/dataTestIds";
import styles from "./PatternDesign.module.scss";

export function PatternDesign({ design, component }: PatternDesignProps) {
  const { theme, motif, scale, colour, repeat } = design;

  const patternClassName = conditionalClassNames({
    [styles.pattern__card]: true,
    [styles.pattern__pink]: colour === "powder pink",
    [styles.pattern__blue]: colour === "cornflower blue",
    [styles.pattern__charcoal]: colour === "charcoal",
    [styles.pattern__green]: colour === "forest green",
    [styles.pattern__grey]: colour === "smoke",
    [styles.pattern__indigo]: colour === "indigo",
  });

  const imageScale = calculateImageScale(component, design.scale)

  const bgPosition = calculateBackgroundPosition(motif, scale, component);

  return (
    <div className={patternClassName} data-testid={dataTestIds.patternDesign}>
        {repeat === "tile" ? (
                <div
                  className={patternClassName}
                  style={{
                    backgroundImage: `url(${`"/src/assets/${motif}.png"`})`,
                    backgroundPosition: `0 0, ${bgPosition.positionOne} ${bgPosition.positionTwo} `,
                    backgroundSize: `${imageScale} auto`,
                  }}
                ></div>
              ) : (
                <div
                  className={patternClassName}
                  style={{
                    backgroundImage: `url(${`"/src/assets/${motif}_bg.png"`}), url(${`"/src/assets/${motif}_bg.png"`})`,
                    backgroundPosition: `0 0, ${bgPosition.positionOne} ${bgPosition.positionTwo} `,
                    backgroundSize: `${imageScale} auto`,
                  }}
                ></div>
              )}
    </div>
  );
}
