import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addLoc, clearG, deleteLoc, setG } from "./reducer";

function LocationData({
  suggetions,
  setSuggetions,
  locations,
  setTopRestaurants,
  setGeoLocation,
  setLocations,
  yourLocation,
  setYourLocation,
  currentLocation,
  setCurrentLocation,
}) {
  const dispatch = useDispatch();

  // Function to handle getting the current location
  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Set current location in the state and dispatch to store
        const geoLocation = { lat: latitude, lng: longitude };
        setCurrentLocation(geoLocation);

        dispatch(clearG());
        dispatch(setG(geoLocation));

        dispatch(deleteLoc());
        setYourLocation("area");
      },
      (error) => {
        console.log("Error getting geolocation: ", error.message);
      }
    );
  };

  // Function to handle location suggestion click
  const handleLocationClick = async (item) => {
    setTopRestaurants([]); // Clear previous restaurant data
    try {
      const response = await axios.get(
        `https://swiggy-backend-sand.vercel.app/${item?.place_id}/placeId`
      );
      const location = response?.data?.data[0]?.geometry?.location;

      setSuggetions(""); // Clear the input field after selection
      setYourLocation(item?.description); // Set the selected location
      dispatch(deleteLoc());
      dispatch(addLoc({ Name: item?.description }));
      dispatch(clearG());
      dispatch(setG(location)); // Update the geo-location based on the place data
    } catch (error) {
      console.error("Error fetching location data: ", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Auto-detect location button */}
        <button
          style={{
            color: "gray",
            backgroundColor: "#f0f0f0",
            padding: "10px 20px",
            margin: "10px 0",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            width: "100%",
            fontSize: "16px",
            borderRadius: "5px",
          }}
          onClick={handleGeoLocation}
        >
          Auto detect my location
        </button>

        {/* Location search input */}
        <input
          value={suggetions}
          onChange={(e) => setSuggetions(e.target.value)}
          placeholder="Search your city"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />

        {/* Suggestions list */}
        {suggetions && suggetions.length >= 3 && locations.length > 0 && (
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              width: "100%",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {locations.map((item, i) => (
              <div
              
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                key={i}
                onClick={() => handleLocationClick(item)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-geo-alt"
                  style={{
                    fontSize: "18px",
                    color: "#007bff",
                    marginRight: "10px",
                  }}
                ></i>
                <span>{item?.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationData;
