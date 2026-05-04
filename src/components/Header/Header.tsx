import { useEffect, useState } from "react";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import styles from "./Header.module.scss";
import { Nav } from "../Nav/Nav";
import { dataTestIds } from "../../utils/dataTestIds";
import { Link, useLocation } from "react-router";
import { useMediaQuery } from 'react-responsive';
import { DesktopNav } from "../DesktopNav/DesktopNav";

export function Header() {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 768px)' })

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
        {!isTabletOrDesktop && (
          <div data-testid={dataTestIds.toggleNav} onClick={toggleOpenNav}>
            <BurgerMenu isOpen={showNav} />
          </div>
        )}

        {isTabletOrDesktop && <DesktopNav />}
      </div>
      {showNav && <Nav />}

    </>
  );
}
