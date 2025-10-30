import React, { useState } from "react";

function PlantCard({ plant, onToggleInStock, onUpdatePrice, onDelete }) {
  const { id, name, image, price, inStock } = plant;
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState(price);

  const handleSave = () => {
    onUpdatePrice(id, editPrice);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditPrice(price);
    setIsEditing(false);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>
        Price:{" "}
        {isEditing ? (
          <input
            type="number"
            step="0.01"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />
        ) : (
          price
        )}
      </p>
      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Price</button>
      )}
      {inStock !== false ? (
        <button className="primary" onClick={() => onToggleInStock(id)}>
          In Stock
        </button>
      ) : (
        <button onClick={() => onToggleInStock(id)}>Out of Stock</button>
      )}
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}

export default PlantCard;
