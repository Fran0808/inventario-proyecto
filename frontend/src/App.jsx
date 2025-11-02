import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Components/Login";
import Cards from "./Components/Cards";
import "bootstrap/dist/css/bootstrap.min.css";

// Componente Inicio (donde se muestran las tarjetas)
const Inicio = () => {
  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-md-3">
          <Cards titulo="Total productos" valor="1,247" cambio="+12 este mes" />
        </div>
        <div className="col-md-3">
          <Cards titulo="Valor total inventario" valor="$245,680" cambio="+3.2%" />
        </div>
        <div className="col-md-3">
          <Cards titulo="Productos con stock bajo" valor="18" cambio="-2 desde ayer" />
        </div>
        <div className="col-md-3">
          <Cards titulo="Movimientos hoy" valor="42" cambio="+8%" />
        </div>
      </div>
    </div>
  );
};

// App principal con rutas
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
