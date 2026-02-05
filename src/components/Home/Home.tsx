import { useNavigate } from "react-router";
import styles from "./Home.module.scss";
import { dataTestIds } from "../../utils/dataTestIds";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.home__container} data-testid={dataTestIds.home}>
        <h1 className={styles.home__heading}>Design Your Own</h1>
        <h2 className={styles.home__subHeading}>Wallpaper</h2>
        <div className={styles.home__ctaContainer}>
          <button
            type="button"
            aria-label="get started"
            onClick={() => navigate("/register")}
            className={styles.home__cta}
          >
            Get started
          </button>
        </div>
      </div>
  );
}
