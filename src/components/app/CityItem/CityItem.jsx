import React from "react";
import styles from "./CityItem.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCities } from "../../../context/CitiesContext";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

function CityItem({ city }) {
  const { currentCity, loadCity, deleteCity } = useCities();
  const { id, cityName, emoji, date, position } = city;
  const navigate = useNavigate();

  // const clickHandler = () => {
  //   loadCity(id);
  //   navigate(`${id}/?lat=${position.lat}&lng=${position.lng}`);
  // };

  const deletHandler = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <Link
      to={`${id}/?lat=${position.lat}&lng=${position.lng}`}
      className={`${styles.cityItem} ${
        currentCity.id === id ? styles["cityItem--active"] : undefined
      }`}
      // onClick={clickHandler}
    >
      <div className={styles.emoji}>{emoji}</div>
      <div className={styles.name}>{cityName}</div>
      <div className={styles.date}>{formatDate(date)}</div>
      <button onClick={deletHandler} className={styles.deleteBtn}>
        &times;
      </button>
    </Link>
  );
}

export default CityItem;
