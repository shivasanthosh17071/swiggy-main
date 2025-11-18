import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./header";
import Shimmer from "./shimmer";
import LocationData from "./locationData";
import TopRestaurants from "./topRestruantsSection";
import Loader from "./loader";
import Footer from "./footer";
import { addLoc, clearG, deleteLoc, setG } from "./reducer";

function Home() {
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [suggetions, setSuggetions] = useState("");
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: "", lng: "" });
  const [forYou, setForYou] = useState([]);
  const [yourLocation, setYourLocation] = useState("hyderabad");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const geo = useSelector((state) => state.geo);

  useEffect(() => {
    axios
      .get(`https://swiggy-backend-sand.vercel.app/topRestaurants`, {
        params: { lat: geo[0].lat, lng: geo[0].lng },
      })
      .then((res) => {
        if (res?.data?.data?.cards[1]?.card?.card?.gridElements) {
          setTopRestaurants(
            res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          );
          setForYou(
            res?.data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
          );
        }
      })
      .catch((err) => err);
  }, [geo]);

  useEffect(() => {
    if (suggetions !== "") {
      axios
        .get(`https://swiggy-backend-sand.vercel.app/${suggetions}/suggetions`)
        .then((res) => {
          if (res.data.data) {
            setLocations(res?.data?.data);
          }
        })
        .catch((err) => {});
    }
  }, [suggetions]);

  return (
    <>
      <div
  className="container-fluid  p-0"
  style={{ minHeight: "100vh", width: "100vw", overflowX: "hidden" }}
>

        {forYou.length <= 0 && <Loader />}

        <div className="row">
          {/* Sidebar for Location */}
          <div className="col-12 col-md-2 d-flex flex-column align-items-start ps-4">
            <button
              className="btn btn-light shadow-sm rounded-pill "
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              Location <i className="bi bi-chevron-compact-down"></i>
            </button>

            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <img
                  src="/foodexpress.png"
                  style={{ width: "30%" }}
                  alt="logo"
                />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <LocationData
                  suggetions={suggetions}
                  setSuggetions={setSuggetions}
                  locations={locations}
                  setLocations={setLocations}
                  topRestaurants={topRestaurants}
                  setTopRestaurants={setTopRestaurants}
                  yourLocation={yourLocation}
                  setYourLocation={setYourLocation}
                  setCurrentLocation={setCurrentLocation}
                  currentLocation={currentLocation}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-10">
            <div className="container py-3">
              {/* Horizontal Scroll Section */}
              <h2 className="fs-4 fw-bold my-3">What's on your mind?</h2>
              <div
                className="d-flex overflow-auto py-2 px-1"
                style={{
                  gap: "16px",
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none",
                }}
              >
                {forYou?.map((item, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      navigate(
                        `/Open/${item?.action?.text}/${item?.entityId?.slice(36, 41)}`
                      )
                    }
                    className="flex-shrink-0"
                    style={{
                      width: "150px",
                      scrollSnapAlign: "start",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      className="img-fluid rounded shadow-sm"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.imageId}`}
                      alt="Category"
                      style={{
                        height: "150px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              {/* Top Restaurants */}
            <h2 className="fs-4 fw-bold my-4">
  Top restaurant {yourLocation ? `chains in ${yourLocation.slice(0, 40)}` : "near you"}
</h2>

<div
  className="d-flex overflow-auto px-2 py-3"
  style={{
    gap: "20px",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
  }}
>
  {topRestaurants.length > 0 ? (
    topRestaurants.map((item, i) => (
      <div
        key={i}
        className="flex-shrink-0 shadow-sm bg-white rounded"
        style={{
          width: "260px",
          scrollSnapAlign: "start",
          borderRadius: "15px",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/${item?.info?.name}/${item?.info?.id}`)}
      >
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`}
          alt={item?.info?.name}
          className="img-fluid"
          style={{
            height: "160px",
            objectFit: "cover",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            width: "100%",
          }}
        />
        <div className="p-2">
          <h6 className="mb-1 text-truncate">{item?.info?.name}</h6>
          <div className="text-muted small mb-1">
            <span
              className={`me-2 ${
                item?.info?.avgRatingString >= 3.5
                  ? "text-success"
                  : "text-warning"
              }`}
            >
              <i className="fa-solid fa-star"></i>{" "}
              {item?.info?.avgRatingString}
            </span>
            <span className="me-2">
              <i className="fa-solid fa-motorcycle"></i>{" "}
              {item?.info?.sla?.slaString}
            </span>
          </div>
          <p className="text-muted small mb-1 text-truncate">
            {item?.info?.cuisines?.slice(0, 3)?.join(", ")}
          </p>
          <small className="fw-bold">{item?.info?.locality}</small>
        </div>
      </div>
    ))
  ) : (
    <Shimmer />
  )}
</div>
 

              <hr className="my-4" />

              <TopRestaurants
                topRestaurants={topRestaurants}
                yourLocation={yourLocation}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
