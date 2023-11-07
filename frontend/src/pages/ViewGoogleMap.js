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
  Autocomplete,
  InfoWindowF,
} from "@react-google-maps/api";
import "../index";
//Fetch job infomation from database
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

function ViewGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCicXzzMnYF5w3QX3b0EZJWu-3mxhYdqlI",
    libraries: ["places"],
  });

  //Google Map Constants
  //const center = { lat: 1.3521, lng: 103.8198 };
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [routeSteps, setRouteSteps] = useState([]);

  //Fetching jobs Constants
  const { jobs, dispatch } = useJobsContext();
  const { user } = useAuthContext();
  const [latLngCache, setlatLngCache] = useState([]);
  const [center, setCenter] = useState({ lat: 1.3521, lng: 103.8198 });
  const [lat, setLat] = useState(1.3521);
  const [lng, setLng] = useState(103.8198);

  //markers
  const homeMarker = {
    id: 1,
    title: "Current Location",
    geocode: { lat, lng },
  };

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

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
            title: item.description,
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
      setCenter({ lat: lat, lng: lng });
      setLat(lat);
      setLng(lng);
    };
    const error = () => {
      console.log("unable to get your location");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };
  const stripHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };
  const getRouteSteps = (result) => {
    let temp = [];
    const steps = result.routes[0].legs[0].steps;
    steps.map((step) => temp.push(step.instructions)); //
    temp = temp.map(stripHtmlTags);
    setRouteSteps(temp);
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
    getRouteSteps(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
  };

  const calculateMarkerRoute = async (position) => {
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: homeMarker.geocode,
      destination: position,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(result);
    console.log(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
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
            onClick={() => {
              setActiveMarker(null);
              setDirectionResponse(null);
              setDistance("");
              setDuration("");
            }}
            mapContainerStyle={{ width: "100%", height: "80%" }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => {
              setMap(map);
              map.panTo(homeMarker.geocode);
            }}
          >
            {directionResponse && (
              <DirectionsRenderer
                directions={directionResponse}
                options={{
                  polylineOptions: {
                    zIndex: 50,
                    strokeColor: "#1976D2",
                    strokeWeight: 5,
                  },
                }}
              />
            )}
            <MarkerF
              key={homeMarker.id}
              position={homeMarker.geocode}
              onClick={() => handleActiveMarker(homeMarker.id)}
            >
              {activeMarker === homeMarker.id ? (
                <InfoWindowF onCloseClick={() => handleActiveMarker(null)}>
                  <div>{homeMarker.title}</div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
            {latLngCache.length > 0 &&
              latLngCache.map((item) => {
                console.log("item is ", item);
                console.log("lat is ", item.lat);
                const position = { lat: item.lat, lng: item.lng };

                return (
                  <MarkerF
                    key={item.id}
                    position={position}
                    onClick={() => {
                      handleActiveMarker(item.id);
                      calculateMarkerRoute(position);
                    }}
                  >
                    {activeMarker === item.id ? (
                      <InfoWindowF
                        onCloseClick={() => handleActiveMarker(null)}
                      >
                        <div>{item.title}</div>
                      </InfoWindowF>
                    ) : null}
                  </MarkerF>
                );
              })}
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
          <HStack spacing={8}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
            </Autocomplete>
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
              onClick={() => map.panTo(homeMarker.geocode)}
            />
          </HStack>

          {routeSteps &&
            routeSteps.map((step, index) => (
              <span key={index}>
                {step}
                <br></br>
              </span>
            ))}
        </Box>
      </Flex>
    </div>
  );
}

export default ViewGoogleMap;
