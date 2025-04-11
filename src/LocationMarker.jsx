import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_KEY = "f367c4bf9092e3121b5e5328aff2aae8";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      console.log(lat, lng);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=da`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather({
            country: data.sys.country,
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        {weather ? (
          <>
            <strong>By:</strong> {weather.city}, {weather.country} <br />
            <strong>Vejr:</strong> {weather.description} <br />
            <strong>Temperatur:</strong> {weather.temperature}°C <br />
            <strong>Koordinater:</strong> <br /> {position.lat.toFixed(4)},{" "}
            {position.lng.toFixed(4)} <br />
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="Vejr ikon"
            />
          </>
        ) : (
          "Henter vejrdata..."
        )}
      </Popup>
    </Marker>
  );
}

export default LocationMarker;
