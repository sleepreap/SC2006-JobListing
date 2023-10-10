import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../index.css";
import { useState } from "react";
import { Icon } from "leaflet";

function ViewMap() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const homeMarker = {
    id: 1,
    geocode: [lat, long],
    popUp: "Current Location",
  };

  const jobMarkers = [
    {
      id: 2,
      geocode: [1.3397, 103.7067],
      popUp: "Job 1",
    },
    {
      id: 3,
      geocode: [1.3419, 103.6974],
      popUp: "Job 2",
    },
  ];

  const JobIcon = new Icon({
    iconUrl: " https://cdn-icons-png.flaticon.com/512/2377/2377874.png",
    iconSize: [38, 38],
  });

  const homeMarkerIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38],
  });

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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          detectRetina={true}
          maxZoom={19}
          minZoom={11}
          // Add the attribution here as a JSX element
          attribution='<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
        />
        {jobMarkers.map((marker) => (
          <Marker key={marker.id} position={marker.geocode} icon={JobIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
        <Marker
          key={homeMarker.id}
          position={homeMarker.geocode}
          icon={homeMarkerIcon}
        >
          <Popup>{homeMarker.popUp}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default ViewMap;
