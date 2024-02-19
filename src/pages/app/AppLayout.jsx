import React from "react";

import styles from "./AppLayout.module.css";
import SideBar from "../../components/app/SideBar/SideBar";
import Map from "../../components/app/Map/Map";
import SpinnerFullPage from "../../components/ui/SpinnerFullPage/SpinnerFullPage";
import { useCities } from "../../context/CitiesContext";

function AppLayout() {
  const { isLoading, error } = useCities();

  // if (isLoading) {
  //   return <SpinnerFullPage />;
  // }
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
