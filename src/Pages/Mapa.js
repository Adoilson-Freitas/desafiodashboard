import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";
import { MdMyLocation } from "react-icons/md";

import "./Map.css";

import { useEffect, useState } from "react";

const center = [-15.974, -41.635];

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
export default function Mapa() {
  const [coords, setCoords] = useState();

  useEffect(() => {
    const statesData = async () => {
      const res = await fetch(
        "https://dev-redes-ora.geodatin.com/api/station/projected/location"
      );
      const data = await res.json();

      setCoords(data);
    };

    statesData();
  }, []);

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
      {coords.features.map((cord) => (
        <Marker
          key={cord.properties.country}
          position={[
            cord.geometry.coordinates[1],
            cord.geometry.coordinates[0],
          ]}
        >
          <Popup>
            <div>
              <h4>{cord.properties.country}</h4>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
