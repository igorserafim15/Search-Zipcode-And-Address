import { CssBaseline } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Address from "./Views/Address/Address";
import Home from "./Views/Home/Home";
import Zipcode from "./Views/Zipcode/Zipcode";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <div style={{ height: "100px" }}></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BuscadorCEP/BuscarEndereco" element={<Zipcode />} />
        <Route path="/BuscadorCEP/BuscarCEP" element={<Address />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
