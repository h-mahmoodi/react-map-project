// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button/Button";
import BackButton from "../../ui/BackButton/BackButton";
import { useCities } from "../../../context/CitiesContext";
import Spinner from "../../ui/Spinner/Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [params] = useSearchParams();

  const navigate = useNavigate();

  const { addCity, isLoading } = useCities();

  const lat = params.get("lat");
  const lng = params.get("lng");

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        if (!response.ok) {
          throw new Error("eoorrrror");
        }
        const data = await response.json();
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(data.countryCode);
        console.log(data, 11111111);
      } catch (error) {}
    };
    fetcher();
  }, [lat, lng]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!cityName && !date) {
      return;
    }
    const newCity = {
      cityName: cityName,
      country: country,
      emoji: emoji,
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
    };

    // console.log(newCity);

    await addCity(newCity);
    navigate("/app");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={`${cityName} / ${country}`}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
