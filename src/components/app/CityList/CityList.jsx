import React from "react";

import styles from "./CityList.module.css";
import CityItem from "../CityItem/CityItem";
import { useCities } from "../../../context/CitiesContext";
import Spinner from "../../ui/Spinner/Spinner";

// const formatDate = (date) => {
//   return new Intl.DateTimeFormat("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   }).format(new Date(date));
// };

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </div>
  );
}

export default CityList;
