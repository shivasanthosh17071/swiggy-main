import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./reducer";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./emptyCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // for modal toggle

  const totalPrice = cartItems.reduce((acc, item) => acc + item.Price, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
    setShowModal(false);
  };

  return (
    <>
      {/* MODAL */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={() => setShowModal(false)}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Clear Cart Confirmation</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to clear your cart?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClearCart}
              >
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CART UI */}
      <div className="container-fluid mb-5 mt-4 px-3">
        <div className="row">
          {/* LEFT SECTION */}
          <div className="col-12 col-lg-9 mb-4">
            <div
              className="d-flex flex-wrap justify-content-between align-items-center p-3 border rounded bg-light"
              style={{ fontWeight: 600 }}
            >
              <span>CART ITEMS - {cartItems.length}</span>
              <span>TO PAY - ₹{totalPrice}</span>
              <span
                role="button"
                className="text-danger"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-trash me-1"></i> CLEAR CART
              </span>
            </div>

            <div className="row mt-3">
              {cartItems.length > 0 ? (
                cartItems.map((item, i) => (
                  <div key={i} className="col-12 col-md-6 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="row g-0 h-100">
                        <div className="col-5">
                          <img
                            src={item?.Image}
                            alt="food"
                            className="img-fluid h-100 w-100 rounded-start"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="col-7">
                          <div className="card-body d-flex flex-column justify-content-between h-100">
                            <div>
                              <h5 className="card-title mb-1">{item?.Name}</h5>
                              <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
                                {item?.Category}
                              </p>
                              <p>
                                <strong>
                                  <i className="bi bi-currency-rupee"></i>
                                  {item?.Price}
                                </strong>
                              </p>
                            </div>
                            <div>
                              <button
                                onClick={() => {
                                  toast(
                                    <b>
                                      ITEM REMOVED <i className="bi bi-cart-x-fill"></i>
                                    </b>,
                                    {
                                      style: {
                                        color: "black",
                                        backgroundColor: "white",
                                      },
                                    }
                                  );
                                  dispatch(removeFromCart(i));
                                }}
                                className="btn btn-outline-danger btn-sm w-100"
                              >
                                REMOVE FROM CART
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          {cartItems.length > 0 && (
            <div className="col-12 col-lg-3">
              <div className="border rounded p-3 shadow-sm bg-white">
                <h5 className="mb-3">Order Summary</h5>
                {cartItems.map((item, i) => (
                  <div key={i}>
                    <div className="d-flex align-items-start mb-3">
                      <img
                        src={item.Image}
                        alt=""
                        className="rounded"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <div className="w-100 d-flex justify-content-between">
                        <div>
                          <strong>{item.Name}</strong>
                          <p className="mb-0 text-muted" style={{ fontSize: "13px" }}>
                            {item.Category}
                          </p>
                        </div>
                        <strong className="text-nowrap">
                          <i className="bi bi-currency-rupee"></i>
                          {item.Price}
                        </strong>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="d-flex justify-content-between mb-2">
                  <span><strong>Total Items</strong></span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span><strong>Total</strong></span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="text-end">
                  <button
                    className="btn w-100"
                    style={{
                      backgroundColor: "#fc8019",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer
        onClick={() => navigate("/Cart")}
        position="bottom-right"
        autoClose={1500}
      />
    </>
  );
}

export default Cart;
