import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Shimmer from "./shimmer"; // Assuming you have a shimmer component

function TopRestaurantsSection({ topRestaurants, yourLocation }) {
  const [searchTopRestaruants, setSearchTopRestaruants] = useState("");
  const [filteredTopRestaruants, setFilteredTopRestaruants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let copyTopRestaurants = [...topRestaurants];
    let filteredResult = copyTopRestaurants?.filter((item) => {
      return (
        item?.info?.name
          ?.toLowerCase()
          .includes(searchTopRestaruants?.toLowerCase()) === true
      );
    });
    setFilteredTopRestaruants(filteredResult);
  }, [searchTopRestaruants]);

  function sortRestaurants(category) {
    let copyTopRestaurants = [...topRestaurants];
    let filteredResult = null;
    if (category === "highToLow") {
      filteredResult = copyTopRestaurants?.sort((a, b) => {
        return b.info?.avgRating - a.info?.avgRating;
      });
    } else if (category === "fastDelivery") {
      filteredResult = copyTopRestaurants.sort((a, b) => {
        return a.info?.sla?.deliveryTime - b.info?.sla?.deliveryTime;
      });
    }
    setFilteredTopRestaruants(filteredResult);
  }

  return (
    <>
      <h2
        style={{
          fontSize: "25px",
          fontWeight: "700",
          wordSpacing: "0.5px",
          marginBottom: "20px",
        }}
      >
        Restaurants with online food delivery in {yourLocation.slice(0, 10)}..
      </h2>

     {/* Filter Section */}
<div
  className="d-flex flex-wrap gap-3 align-items-center"
  style={{ marginBottom: "20px" }}
>
  <input
    className="form-control"
    type="text"
    placeholder="Search top rated restaurants"
    value={searchTopRestaruants}
    onChange={(e) => setSearchTopRestaruants(e.target.value)}
    style={{
      flex: "1 1 250px",
      minWidth: "200px",
      padding: "10px",
      fontSize: "14px",
      borderRadius: "5px",
    }}
  />

  <button
    type="button"
    className="btn btn-outline-primary custom-button"
    style={{
      fontSize: "14px",
      padding: "10px 20px",
      borderRadius: "25px",
      borderColor: "#ff9f00",
      color: "#ff9f00",
      backgroundColor: "transparent",
      transition: "all 0.3s",
      flexShrink: 0,
    }}
    onClick={() => sortRestaurants("highToLow")}
  >
    Rating top
  </button>

  <button
    type="button"
    className="btn btn-outline-success custom-button"
    style={{
      fontSize: "14px",
      padding: "10px 20px",
      borderRadius: "25px",
      borderColor: "#00b700",
      color: "#00b700",
      backgroundColor: "transparent",
      transition: "all 0.3s",
      flexShrink: 0,
    }}
    onClick={() => sortRestaurants("fastDelivery")}
  >
    Fast Delivery
  </button>
</div>


      {/* Restaurants List */}
      <div className="row">
        {topRestaurants === "" ? (
          <Shimmer />
        ) : filteredTopRestaruants?.length === 0 && searchTopRestaruants === "" ? (
          topRestaurants?.map((item, i) => {
            return <Card item={item} key={i} />;
          })
        ) : (
          filteredTopRestaruants?.map((item, i) => {
            return <Card item={item} key={i} />;
          })
        )}

        {searchTopRestaruants !== "" && filteredTopRestaruants?.length === 0 ? (
          <p>No results found for "{searchTopRestaruants}"</p>
        ) : (
          ""
        )}
      </div>
    </>
  );

  function Card({ item }) {
    return (
      <div
        onClick={() => {
          navigate(`/${item?.info?.name}/${item?.info?.id}`);
        }}
        className="col-md-3 mb-4 fade-in-card"
      >
        <div
          className="card"
          style={{
            cursor: "pointer",
            borderRadius: "8px",
            overflow: "hidden",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <img
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`}
            alt="Restaurant"
          />
          <div className="card-body" style={{ padding: "15px" }}>
            <h5
              className="card-title"
              style={{ fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}
            >
              {item?.info?.name}
            </h5>
            <p className="card-text" style={{ fontSize: "14px", color: "#555" }}>
              <span
                style={{
                  marginRight: "5px",
                  color: `${item?.info?.avgRatingString >= 3.5 ? "green" : "orange"}`,
                }}
              >
                <i className="fa-solid fa-star"></i>
              </span>
              <span style={{ marginRight: "5px" }}>
                {item?.info?.avgRatingString}
              </span>
              <span style={{ marginRight: "5px" }}>
                <i className="fa-solid fa-motorcycle"></i>
              </span>
              <span>{item?.info?.sla?.slaString}</span>
            </p>
            <p className="card-text" style={{ fontSize: "13px", color: "#777" }}>
              {item?.info?.cuisines?.slice(0, 2).join(", ")}
            </p>
            <p className="card-text" style={{ fontSize: "14px", fontWeight: "500" }}>
              <b>{item?.info?.locality}</b>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TopRestaurantsSection;
