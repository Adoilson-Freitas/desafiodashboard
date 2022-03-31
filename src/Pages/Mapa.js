import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { MdMyLocation } from "react-icons/md";

import "./styles.css";
import Coordinates from "../components/Coordinates";

const center = [-15.974, -41.635];

export default function Mapa() {
  return (
    <MapContainer
      center={center}
      zoom={4}
      minZoom={2}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <p>
        <MdMyLocation /> {center}
      </p>
      <Coordinates />
    </MapContainer>
  );
}
