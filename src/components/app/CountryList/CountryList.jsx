import React from "react";
import styles from "./CountryList.module.css";

import CountryItem from "../CountryItem/CountryItem";
import { useCities } from "../../../context/CitiesContext";

function CountryList() {
  const { cities } = useCities();

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((item) => item.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
