import React from "react";

import logo from "@images/logo.svg";
import trash from "@images/trash.svg";
import user from "@images/user.svg";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo_and_name}>
        <img src={logo} alt="logo" />
        <div>Lalasia</div>
      </div>
      <div className={styles.navbar}>
        <Link to="/" className={styles.navbar__nav}>
          Products
        </Link>
        <Link to="/" className={styles.navbar__nav}>
          Categories
        </Link>
        <Link to="/" className={styles.navbar__nav}>
          About Us
        </Link>
      </div>
      <div className={styles.trash_and_profile}>
        <Link to="/cart">
          <img src={trash} alt="trash" className={styles.trash} />
        </Link>
        <Link to="/">
          <img src={user} alt="profile" className={styles.profile} />
        </Link>
      </div>
    </header>
  );
};

export default React.memo(Header);
