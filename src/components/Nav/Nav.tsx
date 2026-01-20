import { Link } from "react-router"
import styles from "./Nav.module.scss"

export function Nav() {
    return (
        <div className={styles.nav__container}>
            <ul className={styles.nav__list}>
                <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/"}>Home</Link></li>
                <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/"}>Account</Link></li>
                <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/design"}>Design</Link></li>
                <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/login"}>Login</Link></li>
            </ul>
        </div>
    )
}