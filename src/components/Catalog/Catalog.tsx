import { furnitureData } from "../../data/furniture";
import { FurnitureCard } from "./FurnitureCard";
import "./Catalog.css";

export function Catalog() {
  return (
    <section className="catalog-container">
      <div className="catalog-hero">
        <h1>Примерка мебели в AR</h1>
        <p>Выберите модель и просмотрите ее прямо в вашей комнате с помощью камеры телефона.</p>
      </div>
      <div className="catalog-grid">
        {furnitureData.map((item) => (
          <FurnitureCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}