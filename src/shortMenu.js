import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "./reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function FullMenu() {
  const [menu, setMenu] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://swiggy-backend-sand.vercel.app/menu`, {
        params: { restId: params.restId },
      })
      .then((res) => {
        setMenu(
          res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.slice(
            1
          )
        );
      });
  }, [params.restId]);

  return (
    <>
      <div className="container-fluid mb-5">
        {/* <div className="text-center my-4">
          <h2 className="fw-bold text-uppercase">
            {params?.restName} - <span className="text-primary">Menu</span>
          </h2>
        </div> */}

        <div className="accordion" id="accordionExample">
          {menu?.map((item, i) => {
            return item?.card?.card?.itemCards ? (
            <div className="accordion-item shadow-sm my-3 mx-0 w-100" key={i}>
  <h2 className="accordion-header" id={`heading${i}`}>
    <button
      className="accordion-button collapsed fw-semibold"
      style={{ backgroundColor: "white" }}
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#collapse${i}`}
      aria-expanded="false"
      aria-controls={`collapse${i}`}
    >
      {item?.card?.card?.title}
    </button>
  </h2>

  <div
    id={`collapse${i}`}
    className="accordion-collapse collapse"
    data-bs-parent="#accordionExample"
    aria-labelledby={`heading${i}`}
  >
    <div className="accordion-body">
      <div className="row  g-4">
        {item?.card?.card?.itemCards?.map((itemCard, j) => {
          const info = itemCard?.card?.info;
          if (!info?.imageId || !info?.price) return null;

          return (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-lg-1-5"
              key={j}
            >
              <div
                className="card h-100 shadow-sm border-0"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info.imageId}`}
                  className="card-img-top img-fluid"
                  alt={info.name}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h6 className="fw-bold">{info.name}</h6>
                  <div className="mb-2">
                    {info.isVeg ? (
                      <span className="badge bg-success">Veg</span>
                    ) : (
                      <span className="badge bg-danger">Non-Veg</span>
                    )}
                  </div>
                  <p>
                    <span className="text-dark">
                      ₹{info.price / 100} /-
                    </span>
                  </p>
                  {info?.ratings?.aggregatedRating?.rating && (
                    <p className="mb-1">
                      <span className="text-warning me-1">
                        <i className="fa-solid fa-star"></i>
                      </span>
                      {info.ratings.aggregatedRating.rating}
                      <span className="text-muted ms-2">
                        ({info.ratings.aggregatedRating.ratingCount})
                      </span>
                    </p>
                  )}
                  <button
                    onClick={() => {
                      toast(
                        <>
                          <span>1 item added</span>{" "}
                          <b>
                            VIEW CART <i className="bi bi-cart3"></i>
                          </b>
                        </>,
                        {
                          style: {
                            color: "black",
                            backgroundColor: "white",
                          },
                        }
                      );
                      dispatch(
                        addToCart({
                          Name: info.name,
                          Price: info.price / 100,
                          Category: info.category,
                          Image: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info.imageId}`,
                        })
                      );
                    }}
                    className="btn btn-success w-100 mt-2"
                    style={{}}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>

            ) : null;
          })}

          <ToastContainer
            onClick={() => {
              navigate("/Cart");
            }}
            position="bottom-right"
            autoClose={1500}
          />
        </div>
      </div>
    </>
  );
}

export default FullMenu;
