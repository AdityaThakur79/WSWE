// src/pages/NearbySafeLocations.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import DesignHeader from "../../components/DesignHeader";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMapsContext } from "../../context/MapsContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { hideSpinner, showSpinner } from "../../Redux/slice/SpinnerSlice";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const NearbySafeLocations = () => {
  const [safeLocations, setSafeLocations] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { setCurrentLocation, setSafeLocationPoints } = useMapsContext();
  const [locationKeyword, setLocationKeyword] = useState("Police");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.spinner.isloading);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const options = ["Police", "Hospital"];

  const handleDirectinsClicked = (safeLocationLat, safeLocationLng) => {
    setSafeLocationPoints({ lat: safeLocationLat, lng: safeLocationLng });
    navigate(`/maps/${safeLocationLat}/${safeLocationLng}`);
  };

  const handleButtonClick = (option) => {
    setLocationKeyword(option);
  };

  const getSafeLocations = async () => {
    try {
      dispatch(showSpinner());
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setCurrentLocation({ lat: latitude, lng: longitude });

        // Simulate an API delay to check spinner behavior

        axios
          .get(
            `/api/v1/user/safeLocations/${latitude}/${longitude}/${locationKeyword}`
          )
          .then((response) => {
            setSafeLocations(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching safe locations:", error);
          })
          .finally(() => {
            dispatch(hideSpinner());
          });
      });
    } catch (error) {
      console.error("Error getting geolocation:", error);
      dispatch(hideSpinner());
    }
  };

  useEffect(() => {
    getSafeLocations();
  }, [locationKeyword]);

  return (
    <div className="mx-4">
      <DesignHeader
        name={"safe places"}
        bgColor={"green-500"}
        textColor={"#FAA845"}
      />
      <div className="flex justify-center gap-3">
        {options.map((option) => (
          <button
            className={`px-4 py-2 mx-2 border rounded-md cursor-pointer ${
              locationKeyword === option
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-black border-gray-300"
            }`}
            key={option}
            onClick={() => handleButtonClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {isloading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {safeLocations?.map((place) => (
              <div
                key={place.name}
                className="rounded-lg shadow-lg border-t-2 border-b-2 border-[#FAA845] relative"
              >
                <div className="my-2 p-4 mb-10">
                  <h1 className="text-[23px] font-roboto tracking-tight text-gray-800">
                    Name: {place?.name}
                  </h1>
                  <p className="text-gray-600 font-roboto">
                    Address: {place?.address}
                  </p>
                </div>
                <button
                  className="absolute bottom-2 left-4 rounded-lg bg-green-500 p-[5px]"
                  onClick={() =>
                    handleDirectinsClicked(
                      place?.location?.lat,
                      place?.location?.lng
                    )
                  }
                >
                  directions
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* If Want to show Fetched nearby places on map with marker */}
      {/* {isloading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: latitude, lng: longitude }}
            zoom={14}
          >
            <Marker position={{ lat: latitude, lng: longitude }} label="You" />
            {safeLocations.map((place) => (
              <Marker
                key={place.name}
                position={{
                  lat: place?.location?.lat,
                  lng: place?.location?.lng,
                }}
                title={place.name}
                onClick={() =>
                  handleDirectinsClicked(
                    place?.location?.lat,
                    place?.location?.lng
                  )
                }
              />
            ))}
          </GoogleMap>
        )
      )} */}
    </div>
  );
};

export default NearbySafeLocations;
