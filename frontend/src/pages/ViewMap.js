import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ViewMap() {
  return (
    <MapContainer
      center={[1.3521, 103.8198]}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
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
  );
}

export default ViewMap;
