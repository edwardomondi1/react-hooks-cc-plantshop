import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleInStock, onUpdatePrice, onDelete }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onToggleInStock={onToggleInStock}
          onUpdatePrice={onUpdatePrice}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default PlantList;
