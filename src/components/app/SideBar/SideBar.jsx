import React from "react";

import styles from "./Sidebar.module.css";
import Logo from "../../ui/Logo/Logo";
import AppNav from "../AppNav/AppNav";
import { Outlet } from "react-router-dom";
import User from "../User/User";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <User />
      <footer className={styles.footer}>
        <p className={styles.copyright}>copy right message</p>
      </footer>
    </div>
  );
}

export default SideBar;
