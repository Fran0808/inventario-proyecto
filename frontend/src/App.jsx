import React from "react";
import BarraLateral from "./componentes/BarraLateral/BarraLateral";

function App() {
  return (
    <div className = "d-flex">
      <BarraLateral/>
      <main className = "flex-grow-1 p-4" style = {{ marginLeft: "260px" }}>
        <h1>Gestor de Inventario - Bodega</h1>
        <p>Bienvenido al sistema</p>
      </main>
    </div>
  );
}

export default App;
