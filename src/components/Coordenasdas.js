import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

var orangeIcon = new L.Icon({
  iconUrl: "img/marker-icon-2x-orange.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = orangeIcon;
export default function Coordenasdas() {
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
    <>
      {coords?.features?.map((cord) => (
        <Marker
          key={cord.id}
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
    </>
  );
}
