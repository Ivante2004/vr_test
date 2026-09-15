import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { furnitureData } from "../data/furniture";
import { ARViewer } from "../components/ARViewer/ARViewer";

export default function ARPage() {
  const { id } = useParams();
  const item = furnitureData.find((f) => f.id === id);

  const [selectedVariant, setSelectedVariant] = useState(
    item ? item.variants[0] : null
  );

  if (!item || !selectedVariant) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Модель не найдена</h2>
        <Link to="/">Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      <Link to="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>
        ← Назад в каталог
      </Link>
      <h1 style={{ margin: "16px 0 12px" }}>{item.name}</h1>

      {/* Селектор артикулов по цветам */}
      <div className="color-selector">
        <p className="color-title">
          Цвет: <span>{selectedVariant.colorName}</span>
        </p>
        <div className="color-list">
          {item.variants.map((variant) => (
            <button
              key={variant.id}
              className={`color-btn ${selectedVariant.id === variant.id ? "active" : ""}`}
              onClick={() => setSelectedVariant(variant)}
            >
              <img src={variant.previewImage} alt={variant.colorName} />
            </button>
          ))}
        </div>
      </div>

      <ARViewer model={selectedVariant.model} name={`${item.name} (${selectedVariant.colorName})`} />
    </div>
  );
}