/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

const Product = ({ products, addToCart }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          {products.map((product, index) => {
            const { name, cost, image } = product;
            return (
              <div className="col-sm-4" key={index}>
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={index}
                >
                  <img
                    className="card-img-top"
                    src={image}
                    alt="Card Image"
                    style={{ width: "100%" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{cost}$</p>
                    <button
                      className="btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
