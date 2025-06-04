import React from "react";

function Shimmer() {
  // Create an array with 12 placeholders (you can adjust number)
  const placeholders = Array.from({ length: 12 });

  return (
    <div className="row g-3">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className="shimmer-card col-12 col-sm-6 col-md-4 col-lg-3"
          aria-hidden="true"
        >
          <div className="card-body p-2">
            <h5 className="card-title placeholder-glow mb-3">
              <div
                className="placeholder shimmer-color col-10"
                style={{ height: "200px", borderRadius: "8px" }}
              ></div>
            </h5>
            <p className="card-text placeholder-glow d-flex gap-2 flex-wrap">
              <span className="placeholder shimmer-color col-6" style={{ height: "20px", borderRadius: "4px" }}></span>
              <span className="placeholder shimmer-color col-4" style={{ height: "20px", borderRadius: "4px" }}></span>
              <span className="placeholder shimmer-color col-4" style={{ height: "20px", borderRadius: "4px" }}></span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shimmer;
