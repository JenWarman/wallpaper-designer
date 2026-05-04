import { Link } from "react-router"
import styles from "./DesktopNav.module.scss"

export function DesktopNav() {
    return (
        <div className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/saved-designs"}>Your Designs</Link></li>
              <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/your-orders"}>Your Orders</Link></li>
              <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/design"}>New Design</Link></li>
              <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/archive"}>Archive</Link></li>
            </ul>
        </div>
    )
}