import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./SiteNav.module.css";
import logo from "../../../assets/images/logo.png";
import Logo from "../../ui/Logo/Logo";

function SiteNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="product">Products</NavLink>
        </li>
        <li>
          <NavLink to="pricing">Pricing</NavLink>
        </li>
        <li>
          <Link to="login" className={styles.ctaLink}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SiteNav;
