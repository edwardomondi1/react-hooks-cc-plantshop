import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((data) => setPlants([...plants, data]));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleToggleInStock = (id) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !(plant.inStock ?? true) } : plant
      )
    );
  };

  const handleUpdatePrice = (id, newPrice) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        setPlants(
          plants.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPlants(plants.filter((plant) => plant.id !== id));
    });
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onSubmit={handleAddPlant} />
      <Search onChange={handleSearch} />
      <PlantList
        plants={filteredPlants}
        onToggleInStock={handleToggleInStock}
        onUpdatePrice={handleUpdatePrice}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default PlantPage;
