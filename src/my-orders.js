import React from "react";
import Loader from "./loader";

function MyOrders() {
  const orders = [
    {
      restaurantName: "Food express Biryani House",
      restaurantImage: "https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani-5.jpg",
      orderId: "SWG123456",
      date: "2025-06-01",
      time: "7:30 PM",
      items: ["Chicken Biryani", "Raita", "Gulab Jamun"],
      total: "380",
      status: "Delivered",
      deliveryAddress: "123, MG Road, Bengaluru",
      paymentMode: "UPI",
    },
    {
      restaurantName: "Pizza Station",
      restaurantImage: "https://miro.medium.com/v2/resize:fit:1400/0*oTfm1pTXLxitHHFy.jpg",
      orderId: "SWG789123",
      date: "2025-05-28",
      time: "8:45 PM",
      items: ["Farmhouse Pizza", "Garlic Bread", "Coke"],
      total: "510",
      status: "Cancelled",
      deliveryAddress: "45, Koramangala, Bengaluru",
      paymentMode: "Cash on Delivery",
    },
  ];

  const sectionTitleStyle = {
    fontWeight: 600,
    fontSize: "16px",
    borderBottom: "1px solid #eee",
    paddingBottom: "5px",
    marginBottom: "10px",
    color: "#333",
  };

  const rowStyle = {
    fontSize: "14px",
    marginBottom: "6px",
    color: "#555",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginRight: "4px",
    color: "#000",
  };

  return (
    <>
      <div className="text-center mt-4 mb-3">
        <h4 className="fw-bold" style={{ color: "#333" }}>My Orders</h4>
      </div>

      <div className="container">
        <div className="row">
          {orders.map((order, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-4 mb-4"
            >
              <div
                className="p-3 shadow rounded bg-white h-100"
                style={{
                  border: "1px solid #f1f1f1",
                }}
              >
                {/* Restaurant Info */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={order.restaurantImage}
                    alt="restaurant"
                    className="rounded"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <h6 className="mb-1 fw-semibold" style={{ fontSize: "16px" }}>
                      {order.restaurantName}
                    </h6>
                    <span style={{ fontSize: "13px", color: "#777" }}>
                      Order ID: {order.orderId}
                    </span>
                  </div>
                </div>

                {/* Order Summary */}
                <div style={sectionTitleStyle}>Order Summary</div>
                <div style={rowStyle}>
                  <span style={labelStyle}>Date:</span> {order.date}
                </div>
                <div style={rowStyle}>
                  <span style={labelStyle}>Time:</span> {order.time}
                </div>
                <div style={rowStyle}>
                  <span style={labelStyle}>Items:</span>{" "}
                  {order.items.join(", ")}
                </div>
                <div style={rowStyle}>
                  <span style={labelStyle}>Total:</span> ₹{order.total}
                </div>
                <div style={rowStyle}>
                  <span style={labelStyle}>Status:</span>{" "}
                  <span
                    className={`badge ${
                      order.status === "Delivered"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Delivery Info */}
                <div className="mt-3" style={sectionTitleStyle}>Delivery Info</div>
                <div style={rowStyle}>
                  <span style={labelStyle}>Address:</span>{" "}
                  {order.deliveryAddress}
                </div>
                <div style={rowStyle}>
                  <span style={labelStyle}>Payment:</span>{" "}
                  {order.paymentMode}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyOrders;
