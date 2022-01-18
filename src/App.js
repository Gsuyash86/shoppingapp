import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
// import Product from "./Components/Product";
import NotFound from "./Components/NotFound";
import data from "./data";
import { useState } from "react";
import axios from "axios";
import "./App.css";

const Product = lazy(() => import("./Components/Product"));
function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  // creating a theme , using context

  const totalPrice = cart.reduce(
    (cost, item) => cost + item.quantity * item.cost,
    0
  );

  const addToCart = (product) => {
    const productExist = cart.find((item) => item.id === product.id);

    if (productExist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...productExist, quantity: productExist.quantity + 1 }
            : item
        )
      );
    } else setCart([...cart, { ...product, quantity: 1 }]);
  };

  const handleCheckout = (cart) => {
    let cartData = JSON.stringify(cart);

    let payload = {
      data: {
        data: cartData,
        totalPrice: totalPrice,
        totalItem: cart.length,
      },
    };

    console.log(payload);

    axios({
      method: "post",
      url: "https://janam.free.beeceptor.com",
      data: JSON.stringify(payload),
    }).then((res) => console.log(res.data.data));
  };

  const removeFromCart = (productToRemove) => {
    const productExist = cart.find((item) => item.id === productToRemove.id);

    if (productToRemove.quantity === 1) {
      setCart(cart.filter((item) => item.id !== productToRemove.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productToRemove.id
            ? { ...productExist, quantity: productExist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <>
      <Suspense fallback={<div className="container">Please wait ... </div>}>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={<Product products={products} addToCart={addToCart} />}
              />

              <Route
                exact
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    handleCheckout={handleCheckout}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
