import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner/Spinner";
import Message from "../../ui/Message/Message";
import { useCities } from "../../../context/CitiesContext";
import BackButton from "../../ui/BackButton/BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const APP_URL = "http://localhost:9000";

function City() {
  const params = useParams();

  const [id, setId] = useState();

  const { currentCity, isLoading, error, loadCity } = useCities();

  useEffect(() => {
    setId(params.id);
    loadCity(params.id);
  }, []);

  const { cityName, emoji, date, notes } = currentCity;
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Message message={error} />;
  }

  if (!currentCity || id !== params.id) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div>{params.id}</div>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
