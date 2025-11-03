import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import BarraLateral from "./componentes/BarraLateral/BarraLateral";
import RutasPrivadas from "./componentes/RutasPrivadas/RutasPrivadas";

import Login from "./Login";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Inventario from "./pages/Inventario";
import Proveedores from "./pages/Proveedores";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Redirigir / a /login si no hay auth */}
      <Route
        path="/"
        element={
          localStorage.getItem("auth") ? (
            <Navigate to="/inicio" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Rutas privadas con layout */}
      <Route element={<RutasPrivadas />}>
        <Route
          element={
            <div className="d-flex">
              <BarraLateral />
              <main className="flex-grow-1 p-4" style={{ marginLeft: "260px" }}>
                <Outlet />
              </main>
            </div>
          }
        >
          <Route path="inicio" element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="proveedores" element={<Proveedores />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
