import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchDish() {
  const [searchDish, setSearchDish] = useState("");
  const [RestDish, setRestDish] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const geo = useSelector((state) => state.geo);

  useEffect(() => {
    if (!searchDish) {
      setRestDish([]);
      return;
    }

    axios
      .get(`https://swiggy-backend-sand.vercel.app/searchDish`, {
        params: { lat: geo[0].lat, lng: geo[0].lng, SearchDish: searchDish },
      })
      .then((res) => {
        if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH) {
          setRestDish(
            res.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH.cards.splice(
              1
            )
          );
        } else {
          setRestDish([]);
        }
      })
      .catch(() => setRestDish([]));
  }, [searchDish, geo]);

  return (
    <>
      <div className="container my-5" style={{ marginBottom: "200px" }}>
          <div className="text-center mb-4">
        <h2>Find Delicious Dishes Around You</h2>
        <p className="text-muted">Search for your favorite meals from top restaurants</p>
      </div>
        <div className="d-flex gap-3 mb-4">
          <input
            type="text"
            value={searchDish}
            onChange={(e) => setSearchDish(e.target.value)}
            className="form-control"
            placeholder="Search for Dish"
          />
          {/* <NavLink to={"/SearchRestuarants"}>
            <button className="btn btn-outline-primary">Restaurants</button>
          </NavLink> */}
        </div>

        <div className="row g-4">
          {RestDish.filter(item => item.card?.card?.info?.imageId).length === 0 && searchDish && (
            <p className="text-center text-muted">No dishes found for "{searchDish}"</p>
          )}

          {RestDish
            .filter((item) => item.card?.card?.info?.imageId) // Only items with image
            .map((item, i) => {
              const info = item.card?.card?.info;
              const restInfo = item.card?.card?.restaurant?.info;
              return (
                <div className="col-12 col-md-6 col-lg-4" key={i}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start flex-grow-1">
                        <div style={{ width: "60%" }}>
                          <span
                        onClick={() => {
                          navigate(
                            `/${item?.card?.card?.restaurant?.info?.name}/${item?.card?.card?.restaurant?.info?.id}`
                          );
                        }}
                        style={{ margin: " 4px" }}
                      >
                        <i className="bi bi-arrow-right"></i>{" "}
                      </span>
                          <h5 className="card-title">{restInfo?.name}</h5>
                          <p className="mb-1">
                            <span
                              style={{
                                color: info?.ratings?.aggregatedRating?.rating >= 3.5 ? "green" : "orange",
                              }}
                            >
                              <i className="fa-solid fa-star"></i>
                            </span>{" "}
                            {info?.ratings?.aggregatedRating?.rating} ({info?.ratings?.aggregatedRating?.ratingCount})
                          </p>
                          <p className="mb-1">
                            <i className="fa-solid fa-motorcycle"></i> {restInfo?.sla?.slaString}
                          </p>
                          <p className="mb-1">
                            <strong>Dish:</strong> {info?.name}
                          </p>
                            {" "}
                          <p className="mb-1">
                            <strong>Price: </strong>
                            <i className="bi bi-currency-rupee"></i> {info?.price / 100}
                          </p>
                          <p className="mb-1">
                            {info?.isVeg ? (
                              <span className="text-success">● Veg</span>
                            ) : (
                              <span className="text-danger">● Non-Veg</span>
                            )}
                          </p>
                          <p className="mb-0">
                            <strong>Area:</strong> {restInfo?.areaName}
                          </p>
                        </div>
                        <div style={{ width: "35%" }}>
                          <img
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info?.imageId}`}
                            alt={info?.name}
                            className="img-fluid rounded"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                            onClick={() => {
                          navigate(
                            `/${item?.card?.card?.restaurant?.info?.name}/${item?.card?.card?.restaurant?.info?.id}`
                          );
                        }} />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          toast(
                            <>
                              <span style={{ marginRight: "50px" }}>1 item added</span>{" "}
                              <b>
                                VIEW CART <i className="bi bi-cart3"></i>
                              </b>
                            </>,
                            {
                              style: { color: "black", backgroundColor: "white" },
                            }
                          );
                          dispatch(
                            addToCart({
                              Name: info?.name,
                              Price: info.price / 100,
                              Image: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info?.imageId}`,
                            })
                          );
                        }}
                        type="button"
                        className="btn btn-success mt-3 align-self-start"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <ToastContainer
          onClick={() => {
            navigate("/Cart");
          }}
          position="bottom-right"
          autoClose={1500}
        />
      </div>
    </>
  );
}

export default SearchDish;
