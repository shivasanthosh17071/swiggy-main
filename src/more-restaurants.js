import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Shimmer from "./shimmer";
import Footer from "./footer";
import { useSelector } from "react-redux";

function FoodRestaurant() {
  const params1 = useParams();
  const navigate = useNavigate();
  const [foodRestaurants, setFoodRestaurants] = useState([]);
  const [header, setHeader] = useState({});
  const geo = useSelector((state) => state.geo);

  useEffect(() => {
    axios
      .get(`https://swiggy-backend-sand.vercel.app/moreRestaurants`, {
        params: {
          lat: geo[0].lat,
          lng: geo[0].lng,
          paramsId: params1.id,
          foodName: params1.foodName,
        },
      })
      .then((res) => {
        setFoodRestaurants(res?.data?.data?.cards?.slice(3));
        setHeader(res?.data?.data?.cards[0]?.card?.card);
      });
  }, [geo, params1]);

  return (
    <>
      <div
        className="container   shadow-sm rounded"
        style={{ boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <div
          className="food-header p-2 sticky-md-top bg-white  "
          style={{ top: "70px", zIndex: 2 }}
        >
          <h2 className="fs-1 fw-bold text-dark" style={{ wordSpacing: "0.5px" }}>
            {header?.title}
          </h2>
          <p className="fs-6 text-2 text-muted">{header?.description}</p>
          <hr />
        </div>

        <div className="food-restaurants row g-3 mt-3">
          {foodRestaurants?.length > 0 ? (
            foodRestaurants?.map((item, i) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3  "
                key={i}
                onClick={() => {
                  navigate(
                    `/${item?.card?.card?.info?.name}/${item?.card?.card?.info?.id}`
                  );
                }}
              >
                <div
                  className="card h-100 shadow-sm border-0"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.card?.info?.cloudinaryImageId}`}
                    alt={item?.card?.card?.info?.name}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title text-truncate">{item?.card?.card?.info?.name}</h6>
                    <p className="card-text">
                      Offer: {item?.card?.card?.info?.costForTwo}
                    </p>
                    <p className="d-flex justify-content-between align-items-center">
                      <span
                        className={`text-${
                          item?.card?.card?.info?.avgRatingString >= 3.5
                            ? "success"
                            : "warning"
                        }`}
                      >
                        <i className="fa-solid fa-star"></i>
                        {item?.card?.card?.info?.avgRatingString}
                      </span>
                      <span>
                        <i className="fa-solid fa-motorcycle me-2"></i>
                        {item?.card?.card?.info?.sla?.slaString}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Shimmer />
          )}
        </div>
      </div>
    </>
  );
}

export default FoodRestaurant;
