import styles from "./Header.module.scss"

export function Header() {
    return (
        <div className={styles.header__container}><h1 className={styles.header__heading}>Wallpaper Designer</h1></div>
    )
}