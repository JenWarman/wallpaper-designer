import styles from "./BurgerMenu.module.scss"

export function BurgerMenu() {
    return (
        <div className={styles.burgerMenu}>
            <div className={styles.burgerMenu__burger1}></div>
            <div className={styles.burgerMenu__burger2}></div>
            <div className={styles.burgerMenu__burger3}></div>
        </div>
    )
}