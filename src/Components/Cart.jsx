import React from "react";

const Cart = ({ cart, removeFromCart, handleCheckout }) => {
  const totalPrice = cart.reduce(
    (cost, item) => cost + item.quantity * item.cost,
    0
  );

  return (
    <>
      <div className="container">
        <div className="row">
          {cart.map((product, index) => {
            const { name, cost, image, quantity } = product;
            return (
              <div className="col-sm-4 " key={index}>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <div className="product">
                    <h3>{name}</h3>
                    <h3>{cost}$</h3>
                    <h3>{quantity}</h3>
                    <img src={image} alt={image} className="card-img-top" />
                    <br />
                    <button
                      className="btn-primary mt-2"
                      onClick={() => removeFromCart(product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="container">
          {cart.length !== 0 ? <h3>Total Price : {totalPrice}$</h3> : " "}
        </div>
        {cart.length !== 0 ? (
          <button
            className="btn-success mt-3"
            onClick={() => handleCheckout(cart)}
          >
            Checkout
          </button>
        ) : (
          <h2>Cart is Empty</h2>
        )}
      </div>
    </>
  );
};

export default Cart;
