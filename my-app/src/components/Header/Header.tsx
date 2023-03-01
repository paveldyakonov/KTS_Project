import React from "react";

import logo from "@images/logo.svg";
import trash from "@images/trash.svg";
import user from "@images/user.svg";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo_and_name}>
        <img src={logo} alt="logo" />
        <div>Lalasia</div>
      </div>
      <div className={styles.navbar}>
        <div>Products</div>
        <div>Categories</div>
        <div>About Us</div>
      </div>
      <div className={styles.trash_and_profile}>
        <img src={trash} alt="trash" className={styles.trash} />
        <img src={user} alt="profile" className={styles.profile} />
      </div>
    </header>
  );
};

export default Header;
