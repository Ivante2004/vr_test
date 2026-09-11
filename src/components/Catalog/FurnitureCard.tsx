import { Link } from "react-router-dom";
import type { Furniture } from "../../types/furniture";

interface Props {
  item: Furniture;
}

export function FurnitureCard({ item }: Props) {
  return (
    <article className="card">
      <div className="card-image-wrap">
        <img src={item.image} alt={item.name} className="card-image" />
        <span className="card-badge">{item.category}</span>
      </div>
      <div className="card-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="card-footer">
          <span className="card-price">{item.price.toLocaleString("ru-RU")} ₽</span>
          <Link to={`/ar/${item.id}`} className="card-btn">Примерить в AR</Link>
        </div>
      </div>
    </article>
  );
}