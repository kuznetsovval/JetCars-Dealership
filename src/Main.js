import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Registration from "./Registration";
import Wishlist from "./Wishlist";
import MainPage from "./MainPage";
import AutoLot from "./AutoLot";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/registration"} element={<Registration />} />
        <Route path={"/wishlist"} element={<Wishlist />} />
        <Route path={"/market"} element={<MainPage />} />
        <Route path={"/lot"} element={<AutoLot />} />
      </Routes>
    </Router>
  );
};

export default Main;
