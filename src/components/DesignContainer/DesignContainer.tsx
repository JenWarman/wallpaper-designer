import { useState } from "react";
import { DesignDemo } from "../DesignDemo/DesignDemo";
import { DesignTile } from "../DesignTile/DesignTile";
import styles from "./DesignContainer.module.scss"

export function DesignContainer() {
   const [direction, setDirection] = useState("left")

    return (
        <div className={styles.designContainer__container}>
            {direction === "left" && (<div className={styles.designContainer__tile}>
                <DesignTile/>
                  <img onClick={() => setDirection("right")} className={styles.designContainer__right} src="src/assets/right.png" alt="" />
            </div>)}
            
            {direction === "right" && (<div className={styles.designContainer__demo}>
                 <img onClick={() => setDirection("left")} className={styles.designContainer__left} src="src/assets/left.png" alt="" />
                <DesignDemo/>   
             </div>)}
            
        </div>
    )
}