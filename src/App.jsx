import "./App.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import LocationMarker from "./LocationMarker";
import CitySearch from "./CitySearch";

function ChangeMapView({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 12.5);
  }
  return null;
}

function App() {
  const [selectedPosition, setSelectedPosition] = useState(null);

  return (
    <>
        <div className="page-container">
        <CitySearch onSearch={setSelectedPosition} />{" "}
        <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={true}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeMapView position={selectedPosition} /> 
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  );
}

export default App;
