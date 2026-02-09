import { Link, useNavigate } from "react-router"
import styles from "./Popup.module.scss"
import { dataTestIds } from "../../utils/dataTestIds"

export function Popup() {
    const navigate = useNavigate()
    return (
        <div className={styles.popup__container} data-testid={dataTestIds.popup}>
            <h1>To save your design please register.</h1>
            <button className={styles.popup__cta} aria-label="register" onClick={() => navigate("/register")}>Register</button>
            <p className={styles.popup__text}>Already have an account? <Link to="/login">Login here.</Link></p>
        </div>
    )
}