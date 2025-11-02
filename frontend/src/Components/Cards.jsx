import React from "react";
import "./Cards.css";

const Cards = ({ titulo, valor, cambio, tipo }) => {
  return (
    <div className="card kpi-card text-start">
      <div className="card-body">
        <h6 className="kpi-card-title">{titulo || "Título no definido"}</h6>
        <h3 className="kpi-card-value">{valor || "—"}</h3>
        <p
          className={`kpi-card-change ${
            tipo === "positivo" ? "text-success" : tipo === "negativo" ? "text-danger" : "text-muted"
          }`}
        >
          {cambio || "Sin cambios"}
        </p>
      </div>
    </div>
  );
};

export default Cards;
