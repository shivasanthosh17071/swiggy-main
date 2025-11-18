import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./reducer";
import { ToastContainer, toast } from "react-toastify";
import FullMenu from "./shortMenu";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [filters, setFilters] = useState({
    veg: false,
    nonVeg: false,
    minRating: 0,
    maxPrice: 500,
    searchTerm: "",
  });
  const [fullMenu,setFullMenu] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://swiggy-backend-sand.vercel.app/menu`, {
        params: { restId: params.restId },
      })
      .then((res) => {
        console.log(res)
        const menuData = res?.data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.slice(1);
        const allMenuItems = menuData.flatMap(item => item?.card?.card?.itemCards || []);
        setMenu(allMenuItems);
        setFilteredMenu(allMenuItems);
      });
  }, [params.restId]);

  useEffect(() => {
    const filterMenuItems = () => {
      let filteredItems = [...menu];

      if (filters.veg && filters.nonVeg) {
        // Show all items if both veg and nonVeg are selected
      } else if (filters.veg) {
        filteredItems = filteredItems.filter((item) => item?.card?.info?.isVeg);
      } else if (filters.nonVeg) {
        filteredItems = filteredItems.filter((item) => !item?.card?.info?.isVeg);
      }

      if (filters.minRating) {
        filteredItems = filteredItems.filter((item) =>
          item?.card?.info?.ratings?.aggregatedRating?.rating >= filters.minRating
        );
      }

      if (filters.maxPrice) {
        filteredItems = filteredItems.filter((item) =>
          item?.card?.info?.price && item?.card?.info?.price / 100 <= filters.maxPrice
        );
      }

      if (filters.searchTerm) {
        filteredItems = filteredItems.filter((item) =>
          item?.card?.info?.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }

      setFilteredMenu(filteredItems);
    };

    filterMenuItems();
  }, [filters, menu]);

  // Reset Filters Function
  const resetFilters = () => {
    setFilters({
      veg: false,
      nonVeg: false,
      minRating: 0,
      maxPrice: 500,
      searchTerm: "",
    });
    setFilteredMenu(menu); // Reset filtered items to all items
  };

  return (
    <div className="container-lg py-1">
      <div className="text-center mb-1">
        <h2 className="fw-bold text-uppercase mb-1">
          {params?.restName} - <span className="text-primary">Menu</span>
          <button 
            style={{}}
            type="button"
            className="btn m-4 px-4 py-2 rounded-pill shadow-sm "
            onClick={() => setFullMenu(prev => !prev)}
          >
            {fullMenu ? 'Hide Full Menu' : 'View Full Menu'}
          </button>
        </h2>
      </div>

      {fullMenu === true ? (
        <FullMenu/>
      ) : (
        <div className="shortMenu">
          {/* Filters Section - Responsive Sidebar */}
          <div className="row">
            <div className="col-12 col-md-3 mb-3">
              {/* Offcanvas toggle button visible on small screens */}
              <button
                className="btn btn-outline-primary w-100 d-md-none mb-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#filterOffcanvas"
                aria-controls="filterOffcanvas"
              >
                Filters
              </button>

              {/* Offcanvas for mobile */}
              <div
              style={{backgroundColor:" gray"}}
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="filterOffcanvas"
                aria-labelledby="filterOffcanvasLabel"
              >
                <div className="offcanvas-header">
                  {/* <h5 className="offcanvas-title" id="filterOffcanvasLabel">Filters</h5> */}
                  <button
                    type="button"
                    className="btn-close bg-white text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h4 className="card-title mb-3">Filters</h4>
                      
                      {/* Search Filter */}
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search for items..."
                          value={filters.searchTerm}
                          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                        />
                      </div>

                      {/* Veg/Non-Veg Filter */}
                      <div className="mb-3">
                        <button
                          className={`btn w-100 mb-2 ${filters.veg ? "btn-success" : "btn-outline-success"}`}
                          onClick={() => setFilters({ ...filters, veg: !filters.veg })}
                        >
                          Veg
                        </button>
                        <button
                          className={`btn w-100 mb-2 ${filters.nonVeg ? "btn-danger" : "btn-outline-danger"}`}
                          onClick={() => setFilters({ ...filters, nonVeg: !filters.nonVeg })}
                        >
                          Non-Veg
                        </button>
                      </div>

                      {/* Rating Filter */}
                      <div className="mb-3">
                        <button className="btn w-100 btn-outline-primary" data-bs-toggle="dropdown" aria-expanded="false">
                          Rating
                        </button>
                        <ul className="dropdown-menu">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <li key={rating}>
                              <a
                                className="dropdown-item"
                                onClick={() => setFilters({ ...filters, minRating: rating })}
                              >
                                {rating} Stars
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price Filter */}
                      <div className="mb-3">
                        <button className="btn w-100 btn-outline-info" data-bs-toggle="dropdown" aria-expanded="false">
                          Price
                        </button>
                        <ul className="dropdown-menu">
                          {[100, 200, 300, 400, 500].map((price) => (
                            <li key={price}>
                              <a
                                className="dropdown-item"
                                onClick={() => setFilters({ ...filters, maxPrice: price })}
                              >
                                Up to ₹{price}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Reset Button */}
                      <button className="btn btn-outline-dark w-100" onClick={resetFilters}>
                        Reset Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky sidebar for md+ screens */}
              <div className="d-none d-md-block" style={{ position: "sticky", top: "80px" }}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h4 className="card-title mb-3">Filters</h4>
                    
                    {/* Search Filter */}
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for items..."
                        value={filters.searchTerm}
                        onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                      />
                    </div>

                    {/* Veg/Non-Veg Filter */}
                    <div className="mb-3">
                      <button
                        className={`btn w-100 mb-2 ${filters.veg ? "btn-success" : "btn-outline-success"}`}
                        onClick={() => setFilters({ ...filters, veg: !filters.veg })}
                      >
                        Veg
                      </button>
                      <button
                        className={`btn w-100 mb-2 ${filters.nonVeg ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => setFilters({ ...filters, nonVeg: !filters.nonVeg })}
                      >
                        Non-Veg
                      </button>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-3">
                      <button className="btn w-100 btn-outline-primary" data-bs-toggle="dropdown" aria-expanded="false">
                        Rating
                      </button>
                      <ul className="dropdown-menu">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <li key={rating}>
                            <a
                              className="dropdown-item"
                              onClick={() => setFilters({ ...filters, minRating: rating })}
                            >
                              {rating} Stars
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-3">
                      <button className="btn w-100 btn-outline-info" data-bs-toggle="dropdown" aria-expanded="false">
                        Price
                      </button>
                      <ul className="dropdown-menu">
                        {[100, 200, 300, 400, 500].map((price) => (
                          <li key={price}>
                            <a
                              className="dropdown-item"
                              onClick={() => setFilters({ ...filters, maxPrice: price })}
                            >
                              Up to ₹{price}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Reset Button */}
                    <button className="btn btn-outline-dark w-100" onClick={resetFilters}>
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items Section */}
            <div className="col-md-9">
              {filteredMenu.length === 0 ? (
                <div className="alert alert-warning text-center">
                  <strong>No items match your filters.</strong> Try adjusting your filters.
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {filteredMenu.map((item, i) => {
                    const itemInfo = item?.card?.info;
                    return itemInfo && itemInfo.imageId ? (
                      <div
  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
  key={i}
>
  <div className="card shadow-sm border-1 h-100">
    <img
      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${itemInfo.imageId}`}
      className="card-img-top img-fluid"
      alt={itemInfo.name}
      style={{
        height: "200px",
        objectFit: "cover",
        transition: "transform 0.3s ease-in-out",
      }}
    />
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{itemInfo.name}</h5>
      <div className="mb-2">
        {itemInfo.isVeg ? (
          <span className="badge text-bg-success">Veg</span>
        ) : (
          <span className="badge text-bg-danger">Non-Veg</span>
        )}
      </div>
      <p className="card-text">
        {itemInfo.price ? (
          <span className="price">
            <i className="bi bi-currency-rupee"></i>{" "}
            {(itemInfo.price / 100).toFixed(2)} /-
          </span>
        ) : (
          <span className="text-muted">Not Available</span>
        )}
      </p>
      <p className="card-text">
        <span
          style={{
            color: itemInfo?.ratings?.aggregatedRating?.rating
              ? "green"
              : "gray",
          }}
        >
          <i className="fa-solid fa-star"></i>
        </span>{" "}
        {itemInfo?.ratings?.aggregatedRating?.rating || "N/A"}{" "}
        <span style={{ marginLeft: "5px" }}>
          {itemInfo?.ratings?.aggregatedRating?.ratingCount || 0}
        </span>
      </p>
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
              Name: itemInfo?.name,
              Price: itemInfo?.price / 100,
              Category: itemInfo?.category,
              Image: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${itemInfo.imageId}`,
            })
          );
        }}
        className="btn btn-success mt-auto w-100"
      >
        ADD TO CART
      </button>
    </div>
  </div>
</div>

                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast for Cart */}
      <ToastContainer
        onClick={() => navigate("/Cart")}
        position="bottom-right"
        autoClose={1500}
      />
    </div>
  );
}

export default Menu;
