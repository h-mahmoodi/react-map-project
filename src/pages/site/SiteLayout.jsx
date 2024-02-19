import React from "react";
import { Outlet } from "react-router-dom";
import SiteNav from "../../components/site/SiteNav/SiteNav";

import styles from "./SiteLayout.module.css";

function SiteLayout() {
  return (
    <section className={styles.container}>
      <SiteNav />
      <Outlet />
    </section>
  );
}

export default SiteLayout;
