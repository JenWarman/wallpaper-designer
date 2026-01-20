import type { BurgerMenuProps } from "../../types/types"
import styles from "./BurgerMenu.module.scss"

export function BurgerMenu({isOpen}: BurgerMenuProps) {
    return (
        <div className={styles.burgerMenu}>
            <div className={`${styles.burgerMenu__burger} ${isOpen ? styles.burgerMenu__burger1 : ""}`}></div>
            <div className={`${styles.burgerMenu__burger} ${isOpen ? styles.burgerMenu__burger2 : ""}`}></div>
            <div className={`${styles.burgerMenu__burger} ${isOpen ? styles.burgerMenu__burger3 : ""}`}></div>
        </div>
    )
}