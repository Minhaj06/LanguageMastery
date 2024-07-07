import React, { useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import FullScreenLoader from "./components/fullScreenLoader/FullScreenLoader";

const App = () => {
  return (
    <>
      <Toaster />
      <FullScreenLoader />
      <div className="App overflow-x-hidden">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
