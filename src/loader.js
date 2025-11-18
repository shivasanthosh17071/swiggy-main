import React from "react";
import "./App.css";
function Loader() {
  return (
    <>
      <div className="loader">
        <div
          className="spinner-border text-light"
          role="status"
          style={{ width: "70px", height: "70px" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>{" "}
        <img
          style={{ marginTop: "-60px", marginLeft: "-70px", width: "60px" }}
          src="/foodexpress.png"
          alt="swiggy"
        />
        <h2> Looking great food near you ...</h2>
      </div>
    </>
  );
}
export default Loader;
