import { Link } from "react-router";
import styles from "./Footer.module.scss"

export function Footer() {
    return (
         <div className={styles.footer}>
            <Link to={'/'} className={styles.footer__heading}>Designed and developed by Jen Warman.</Link>
            <div className={styles.footer__links}>
                <a target="_blank" className={styles.footer__link} href="https://www.linkedin.com/in/jen-warman-38198a172/" title="Link to Jen Warman's LinkedIn page.">
                    LinkedIn</a>
                <a target="_blank" className={styles.footer__link}  href="https://github.com/JenWarman" title="Link to Jen Warman's Github account.">
                    Github</a>
                <a target="_blank" className={styles.footer__link}  href="https://jen-warman-portfolio.netlify.app/" title="Link to Jen Warman's portfolio.">
                  Portfolio</a>
            </div>
        </div>
    )
}