import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../index";
import React, { useState, useEffect } from "react";
import { Icon } from "leaflet";
//Fetch job infomation from database
import { useJobsContext } from "../hooks/useJobsContext";
import axios from "axios";

function ViewMap() {
  const { jobs, dispatch } = useJobsContext();
  const [lat, setLat] = useState("1.3521");
  const [long, setLong] = useState("103.8198");
  const [updateJobs, setUpdateJobs] = useState([]);

  // Update whenever new job listing is added
  useEffect(() => {
    const fetchJobListing = async () => {
      const response = await fetch("/joblist/");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_JOBLISTINGS", payload: json });

        const currentDate = new Date(); // Creates a new Date object with the current date and time

        // You can format the date as needed, for example:
        const formattedDate = currentDate.toDateString(); // Converts the date to a human-readable string
        const currentTime = currentDate.toTimeString(); // Converts the time to a human-readable string

        console.log("Date is :", formattedDate);
        console.log("Time is :", currentTime);
      }
    };
    fetchJobListing();
  }, [dispatch]);

  async function fetchLatLong(postalCode) {
    try {
      const response = await axios.get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
      );
      const lat = response.data.results[0].LATITUDE;
      const lng = response.data.results[0].LONGITUDE;
      return { lat, lng };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchDataWithLatLong(data) {
    const updatedJobs = await Promise.all(
      jobs.map(async (item) => {
        const postalCode = item.location;
        const { lat, lng } = await fetchLatLong(postalCode);
        return { ...item, lat, lng };
      })
    );
    return updatedJobs;
  }

  fetchDataWithLatLong(jobs)
    .then((updatedJobs) => {
      setUpdateJobs(updatedJobs);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const homeMarker = {
    id: 1,
    geocode: [lat, long],
    popUp: "Current Location",
  };

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
          url="https://www.onemap.gov.sg/maps/tiles/Default_HD/{z}/{x}/{y}.png"
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
        {updateJobs &&
          updateJobs.map((marker) => {
            // Convert the postal code to a position array
            const position = [marker.lat, marker.lng];

            return (
              <Marker key={marker._id} position={position} icon={JobIcon}>
                <Popup>
                  <div>
                    <p>{"Company: " + marker.description}</p>
                    <p>{"Postal code: " + marker.location}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        ;
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
