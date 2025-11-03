// src/componentes/RutasPrivadas/RutasPrivadas.jsx
import { Navigate, Outlet } from "react-router-dom";

const RutasPrivadas = () => {
  const auth = localStorage.getItem("auth");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default RutasPrivadas;
