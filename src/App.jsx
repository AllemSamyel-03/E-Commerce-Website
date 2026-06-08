import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import AuthContext from "./context/AuthContext";
import CartContext from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/Checkout";
import NotFound from "./components/NotFound";
import "./App.css";

const getStoredData = (key, fallbackValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : fallbackValue;
};

const getUserCartKey = (userId) => `shopEaseCart_${userId}`;

const getUserWishlistKey = (userId) => `shopEaseWishlist_${userId}`;

const App = () => {
  const location = useLocation();
  const storedCurrentUser = getStoredData("shopEaseCurrentUser", null);
  const [currentUser, setCurrentUser] = useState(storedCurrentUser);
  const [cartList, setCartList] = useState(
    storedCurrentUser !== null
      ? getStoredData(getUserCartKey(storedCurrentUser.id), [])
      : [],
  );
  const [wishlist, setWishlist] = useState(
    storedCurrentUser !== null
      ? getStoredData(getUserWishlistKey(storedCurrentUser.id), [])
      : [],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem(
        getUserCartKey(currentUser.id),
        JSON.stringify(cartList),
      );
    }
  }, [cartList, currentUser]);

  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem(
        getUserWishlistKey(currentUser.id),
        JSON.stringify(wishlist),
      );
    }
  }, [wishlist, currentUser]);

  useEffect(() => {
    if (currentUser === null) {
      localStorage.removeItem("shopEaseCurrentUser");
    } else {
      localStorage.setItem("shopEaseCurrentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const signupUser = (userDetails) => {
    const usersList = getStoredData("shopEaseUsers", []);
    const userAlreadyExists = usersList.some(
      (eachUser) => eachUser.email === userDetails.email,
    );

    if (userAlreadyExists) {
      return {
        isSuccess: false,
        message: "User already exists. Please login.",
      };
    }

    const newUser = { ...userDetails, id: Date.now() };
    localStorage.setItem(
      "shopEaseUsers",
      JSON.stringify([...usersList, newUser]),
    );
    setCartList([]);
    setWishlist([]);
    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
    return { isSuccess: true, message: "Signup successful." };
  };

  const loginUser = ({ email, password }) => {
    const usersList = getStoredData("shopEaseUsers", []);
    const matchedUser = usersList.find(
      (eachUser) => eachUser.email === email && eachUser.password === password,
    );

    if (matchedUser === undefined) {
      return { isSuccess: false, message: "Invalid email or password." };
    }

    setCartList(getStoredData(getUserCartKey(matchedUser.id), []));
    setWishlist(getStoredData(getUserWishlistKey(matchedUser.id), []));
    setCurrentUser({
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
    });
    return { isSuccess: true, message: "Login successful." };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const addToCart = (product) => {
    setCartList((prevCartList) => {
      const productInCart = prevCartList.find((item) => item.id === product.id);

      if (productInCart !== undefined) {
        return prevCartList.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCartList, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartList((prevCartList) =>
      prevCartList.filter((eachProduct) => eachProduct.id !== id),
    );
  };

  const increaseQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList.map((eachProduct) =>
        eachProduct.id === id
          ? { ...eachProduct, quantity: eachProduct.quantity + 1 }
          : eachProduct,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList
        .map((eachProduct) =>
          eachProduct.id === id
            ? { ...eachProduct, quantity: eachProduct.quantity - 1 }
            : eachProduct,
        )
        .filter((eachProduct) => eachProduct.quantity > 0),
    );
  };

  const clearCart = () => setCartList([]);

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const productInWishlist = prevWishlist.some(
        (item) => item.id === product.id,
      );

      if (productInWishlist) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }

      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (id) => wishlist.some((product) => product.id === id);

  const authContextValue = {
    currentUser,
    signupUser,
    loginUser,
    logoutUser,
  };

  const cartContextValue = {
    cartList,
    wishlist,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <CartContext.Provider value={cartContextValue}>
        <div className="app-container">
          {currentUser !== null && <Header />}
          <div className="route-content">
            <Routes>
              <Route
                path="/login"
                element={currentUser ? <Navigate to="/" replace /> : <Login />}
              />
              <Route
                path="/signup"
                element={currentUser ? <Navigate to="/" replace /> : <Signup />}
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {currentUser !== null && <Footer />}
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
