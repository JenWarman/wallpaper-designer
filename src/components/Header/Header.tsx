import { useState } from "react";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import styles from "./Header.module.scss";
import { Nav } from "../Nav/Nav";

export function Header() {
  const [showNav, setShowNav] = useState(false);

  const toggleOpenNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>
      <div className={styles.header__container}>
        <h1 className={styles.header__heading}>Wallpaper Designer</h1>
        <div onClick={toggleOpenNav}>
          <BurgerMenu isOpen={showNav} />
        </div>
      </div>
      {showNav && <Nav />}
    </>
  );
}
