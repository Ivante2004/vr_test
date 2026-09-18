import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { furnitureData } from "../data/furniture";
import { ARViewer } from "../components/ARViewer/ARViewer";
import { HandARViewer } from "../components/HandARViewer/HandARViewer";

export default function ARPage() {
  const { id } = useParams();
  const item = furnitureData.find((f) => f.id === id);

  // Выбранный артикул (цвет)
  const [selectedVariant, setSelectedVariant] = useState(
    item ? item.variants[0] : null
  );

  // Режим управления жестами
  const [useHandControl, setUseHandControl] = useState(false);

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

<<<<<<< HEAD
      {/* Блок выбора артикулов (Цветов) */}
      <div className="color-selector" style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 15, color: "#4b5563", marginBottom: 8 }}>
          Цвет: <span style={{ fontWeight: 600, color: "#111827" }}>{selectedVariant.colorName}</span>
=======
      {/* Селектор артикулов */}
      <div className="color-selector">
        <p className="color-title">
          Цвет: <span>{selectedVariant.colorName}</span>
>>>>>>> beead52 (Fix mediapipe base url for gh-pages)
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          {item.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              style={{
                width: 56,
                height: 64,
                padding: 4,
                background: "#fff",
                border: selectedVariant.id === variant.id ? "2px solid #2563eb" : "2px solid #e5e7eb",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <img
                src={variant.previewImage}
                alt={variant.colorName}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Переключатель режима жестов */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setUseHandControl(!useHandControl)}
          style={{
            padding: "10px 18px",
            background: useHandControl ? "#16a34a" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {useHandControl ? "✕ Вернуться к AR-просмотру" : "🖐 Включить управление жестами (открыть ящик)"}
        </button>
      </div>

      {/* Отображение плеера в зависимости от режима */}
      {useHandControl ? (
        <HandARViewer modelPath={selectedVariant.model} />
      ) : (
        <ARViewer model={selectedVariant.model} name={`${item.name} (${selectedVariant.colorName})`} />
      )}
    </div>
  );
}