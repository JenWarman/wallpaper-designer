import { useEffect, useState } from "react";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import styles from "./Header.module.scss";
import { Nav } from "../Nav/Nav";
import { dataTestIds } from "../../utils/dataTestIds";
import { Link, useLocation } from "react-router";

export function Header() {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  const toggleOpenNav = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    (async () => {
      setShowNav(false);
    })();
  }, [location]);

  return (
    <>
      <div
        className={styles.header__container}
        data-testid={dataTestIds.header}
      >
        <Link to={"/"} className={styles.header__heading}>
          Wallpaper Designer
        </Link>
        <div data-testid={dataTestIds.toggleNav} onClick={toggleOpenNav}>
          <BurgerMenu isOpen={showNav} />
        </div>
      </div>
      {showNav && <Nav />}
    </>
  );
}
