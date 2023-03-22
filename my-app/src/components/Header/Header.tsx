import React from "react";

import logo from "@images/logo.svg";
import trash from "@images/trash.svg";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";
import { useLocalStore } from "@utils/useLocalStore";
import HeaderStore from "@store/HeaderStore";
import { observer } from "mobx-react-lite";

const Header: React.FC = (): any => {
  const headerStore = useLocalStore(() => new HeaderStore());

  return (
    <header className={styles.header}>
      <div className={styles.logo_and_name}>
        <img src={logo} alt="logo" />
        <div>Lalasia</div>
      </div>
      <div className={styles.navbar}>
        <NavLink to="/" 
          className={({ isActive }) => (isActive ? 
            `${styles.navbar__nav} ${styles.selected}` : 
            styles.navbar__nav)
          } >
          Products
        </NavLink>
        <NavLink to="/categories" 
          className={({ isActive }) => (isActive ? 
            `${styles.navbar__nav} ${styles.selected}` : 
            styles.navbar__nav)
          }>
          Categories
        </NavLink>
      </div>
      <div className={styles.trash_and_profile}>
        <NavLink to="/cart" 
          className={({ isActive }) => (isActive ? 
            `${styles["cart-selected"]}` : 
            ""
          )}>
          <div className={styles.trash}>
            <img src={trash} alt="trash" />
            <div className={styles["cart-length"]}>
              {headerStore.cartLength}
            </div>
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default observer(Header);
