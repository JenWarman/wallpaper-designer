import { Link } from "react-router"
import styles from "./Nav.module.scss"
import { dataTestIds } from "../../utils/dataTestIds"

export function Nav() {
    return (
        <div className={styles.nav__container} data-testid={dataTestIds.nav}>
            <ul className={styles.nav__list}>
                 <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/saved-designs"}>Your Designs</Link></li>
                  <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/"}>Your Orders</Link></li>
                  <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/design"}>New Design</Link></li>
                <li className={styles.nav__listItem}><Link className={styles.nav__link} to={"/"}>Account</Link></li>
            </ul>
        </div>
    )
}