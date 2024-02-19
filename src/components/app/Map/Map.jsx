import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../../../context/CitiesContext";

const clickHandler = () => {};

const MapMarker = () => {
  const navigate = useNavigate();
  const map = useMapEvent({
    click(e) {
      // map.locate();

      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      console.log(e);
    },
  });
};

const MapCenter = ({ lat = 51.505, lng = -0.09 }) => {
  const map = useMap();
  map.setView([lat, lng]);
};

function Map() {
  const { cities, currentCity } = useCities();

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.emoji} <br /> {city.cityName}
            </Popup>
          </Marker>
        ))}
        <MapMarker />
        <MapCenter
          lat={currentCity.position?.lat}
          lng={currentCity.position?.lng}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
