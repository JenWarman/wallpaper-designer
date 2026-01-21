import type { PatternDesignProps } from "../../types/types";
import { calculateBackgroundPosition } from "../../utils/calculateBackgroundPosition";
import conditionalClassNames from "../../utils/conditionalClassNames";
import styles from "./PatternDesign.module.scss";

export function PatternDesign({ design }: PatternDesignProps) {
  const { motif, scale, colour, repeat } = design;

  const patternClassName = conditionalClassNames({
    [styles.pattern__card]: true,
    [styles.pattern__pink]: colour === "pink",
    [styles.pattern__blue]: colour === "blue",
  });

  const imageScale =
    scale === "small" ? "10px" : scale === "medium" ? "25px" : "50px";

  const bgPosition = calculateBackgroundPosition(motif, scale, "card");

  return (
    <div className={patternClassName}>
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
