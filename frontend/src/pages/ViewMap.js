import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

function ViewMap() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  //use to get users current location to center map
  const handleClick = () => {
    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      setLat(lat);
      setLong(long);
    };
    const error = () => {
      console.log("unable to get your location");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <div>
      <button onClick={handleClick}>Centre Map</button>
      <MapContainer
        center={[lat, long]}
        zoom={13}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
          detectRetina={true}
          maxZoom={19}
          minZoom={11}
          // Add the attribution here as a JSX element
          attribution={
            <div>
              <img
                src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png"
                style={{ height: "20px", width: "20px" }}
                alt="OneMap Logo"
              />
              <a
                href="https://www.onemap.gov.sg/"
                target="_blank"
                rel="noopener noreferrer"
              >
                OneMap
              </a>
              &nbsp;©&nbsp;contributors&nbsp;|&nbsp;
              <a
                href="https://www.sla.gov.sg/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Singapore Land Authority
              </a>
            </div>
          }
        />
      </MapContainer>
    </div>
  );
}

export default ViewMap;
