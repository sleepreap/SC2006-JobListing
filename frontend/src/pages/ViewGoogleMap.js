import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "../index";
//Fetch job infomation from database
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

function ViewGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCicXzzMnYF5w3QX3b0EZJWu-3mxhYdqlI",
  });

  //Google Map Constants
  const center = { lat: 1.3521, lng: 103.8198 };
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  //Fetching jobs Constants
  const { jobs, dispatch } = useJobsContext();
  const { user } = useAuthContext();
  const [latLngCache, setlatLngCache] = useState([]);
  //const [center, setCenter] = useState({ lat: 1.3521, lng: 103.8198 });
  const [lat, setLat] = useState("1.3521");
  const [lng, setLng] = useState("103.8198");

  //markers
  const homeMarker = {
    id: 1,
    geocode: [lat, lng],
    popUp: "Current Location",
  };
  //   const JobIcon = new Icon({
  //     iconUrl: " https://cdn-icons-png.flaticon.com/512/2377/2377874.png",
  //     iconSize: [38, 38],
  //   });

  //   const homeMarkerIcon = new Icon({
  //     iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  //     iconSize: [38, 38],
  //   });

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  // Update whenever new job listing is added
  useEffect(() => {
    const fetchJobListing = async () => {
      const response = await fetch("/joblist/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_JOBLISTINGS", payload: json });
        fetchDataWithLatLong(jobs);
      }
    };

    fetchJobListing();
  }, [dispatch, user]);

  async function fetchLatLong(postalCode) {
    try {
      const response = await axios.get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
      );
      if (response.data.results && response.data.results.length > 0) {
        console.log("lat and lng returned from API");
        const lat = parseFloat(response.data.results[0].LATITUDE);
        const lng = parseFloat(response.data.results[0].LONGITUDE);
        return { lat, lng };
      }
    } catch (error) {
      console.error("Error fetching lat and long data:", error);
    }
  }

  async function fetchDataWithLatLong(jobs) {
    try {
      jobs.map(async (item) => {
        const postalCode = item.location;

        const results = await fetchLatLong(postalCode);

        if (results && results.lat !== undefined && results.lng !== undefined) {
          const latLngtemp = {
            id: postalCode,
            lat: results.lat,
            lng: results.lng,
          };

          // Check if the object already exists in the array

          const doesExist = latLngCache.some(
            (item) => item.id === latLngtemp.id
          );

          if (!doesExist) {
            // Object doesn't exist, so push it into the array
            console.log("tempcache updated");
            latLngCache.push(latLngtemp);
            console.log("Updated latLngCache:", latLngCache);
          }
        }
      });
      setlatLngCache(latLngCache);
    } catch (error) {
      console.error("Error updating lat and lng as props:", error);
    }
  }

  //use to get users current location to center map
  const handleClick = () => {
    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLat(lat);
      setLng(lng);
    };
    const error = () => {
      console.log("unable to get your location");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(result);
    console.log(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].distance.text);
  };

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  if (!isLoaded) {
    return <SkeletonText></SkeletonText>;
  }
  return (
    <div>
      <button onClick={handleClick}>Centre Map</button>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          <GoogleMap
            center={center}
            zoom={12}
            mapContainerStyle={{ width: "100%", height: "90%" }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            {latLngCache.length > 0 &&
              latLngCache.map((item) => {
                console.log("item is ", item);
                console.log("lat is ", item.lat);
                const position = { lat: item.lat, lng: item.lng };

                return (
                  <MarkerF key={item.id} position={position} />
                  // You can also access other properties from the `marker` object here
                );
              })}
            <MarkerF position={center}></MarkerF>
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
        </Box>
        <Box
          p={4}
          borderRadius="lg"
          m={4}
          bgColor="white"
          shadow="base"
          minW="container.md"
          zIndex="1"
        >
          <HStack spacing={4}>
            <Input type="text" placeholder="Origin" ref={originRef} />
            <Input type="text" placeholder="Destination" ref={destinationRef} />
            <ButtonGroup>
              <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={7} mt={4} justifyContent="space-between">
            <Text>Distance: {distance} </Text>
            <Text>Duration:{duration} </Text>
            <IconButton
              aria-label="center back"
              icon={<FaLocationArrow />}
              isRound
              onClick={() => map.panTo(center)}
            />
          </HStack>
        </Box>
      </Flex>
    </div>
  );
}

export default ViewGoogleMap;