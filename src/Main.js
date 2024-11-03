import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import App from "./App";
import Registration from "./Registration";
import Wishlist from "./Wishlist";
import MainPage from "./MainPage";
import AutoLot from "./AutoLot";

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        console.log("Користувач авторизований");
      } else {
        setIsAuthenticated(false);
        console.log("Користувач не авторизований");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/registration"} element={<Registration />} />
        <Route
          path={"/wishlist"}
          element={isAuthenticated ? <Wishlist /> : <Navigate to="/" />}
        />
        <Route path={"/market"} element={<MainPage />} />
        <Route
          path="/market/lot/:id"
          element={isAuthenticated ? <AutoLot /> : <Navigate to="/" />}
        />
        <Route
          path="/wishlist/lot/:id"
          element={isAuthenticated ? <AutoLot /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default Main;
