import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import Product from "./Components/Product";
import NotFound from "./Components/NotFound";
import data from "./data";
import { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

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

    axios({
      method: "post",
      url: "https://janam.free.beeceptor.com",
      data: payload,
    }).then((res) => console.log(res.data));
  };

  const removeFromCart = (productToRemove) => {
    //TODO: do something here
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
    </>
  );
}

export default App;
