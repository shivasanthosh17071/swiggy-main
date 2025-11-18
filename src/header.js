import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import swiggy from "./images/swiggy.png";

function Header() {
  const cartItems = useSelector((state) => state.cartItems);
  const location = useSelector((state) => state.location);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top"
        style={{ padding: "0.5rem 1rem", zIndex: "10" }}
      >
        <div className="container-fluid">
          {/* Logo */}
          <NavLink className="m-0 p-0 navbar-brand " to="/">
            <img src='/foodexpress.png' alt="Food express" style={{ width: "80px" }} />
          </NavLink>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Menu */}
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul  onClick={() => setMenuOpen(!menuOpen)} className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 align-items-center">
              {location && (
                 location[0]?.Name && <li className="nav-item">
                  <NavLink
                    className="nav-link fw-bold text-dark"
                    to="/"
                    style={{
                      borderBottom: "2px solid black",
                      fontSize: "14px",
                    }}
                  >
                    {location[0]?.Name?.slice(0, 20)}
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/">
                  <i className="bi bi-house"></i> Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/SearchDishes">
                  <i className="bi bi-search"></i> Search
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/MyOrders">
                  <i className="bi bi-person"></i> My Orders
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-dark"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                >
                  <i className="bi bi-box-arrow-in-left"></i> Sign In
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/Cart">
                  <i className="bi bi-cart3"></i> Cart {cartItems.length}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Offcanvas login */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <img src="/foodexpress.png" style={{ width: "30%" }} alt="swiggy" />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column">
            <b>LOG IN</b>
            <p>
              or <span style={{ color: "#fc8019" }}>create an account</span>
            </p>
            <input
              className="form-control mt-4 mb-3"
              placeholder="ENTER YOUR PHONE NUMBER"
              style={{ padding: "15px" }}
            />
            <button
              className="btn"
              style={{
                backgroundColor: "#fc8019",
                color: "white",
                fontWeight: "700",
                letterSpacing: "5px",
                padding: "15px",
              }}
              data-bs-dismiss="offcanvas"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
