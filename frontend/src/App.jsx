import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraLateral from "./componentes/BarraLateral/BarraLateral";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Inventario from "./pages/Inventario";
import Proveedores from "./pages/Proveedores";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login sin barra lateral */}
        <Route path="/login" element={<Login />} />

        {/* Páginas con barra lateral */}
        <Route
          path="/*"
          element={
            <div className="d-flex">
              <BarraLateral />
              <main className="flex-grow-1 p-4" style={{ marginLeft: "260px" }}>
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/productos" element={<Productos />} />
                  <Route path="/inventario" element={<Inventario />} />
                  <Route path="/proveedores" element={<Proveedores />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
