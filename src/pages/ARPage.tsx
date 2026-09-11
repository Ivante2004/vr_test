import { useParams, Link } from "react-router-dom";
import { furnitureData } from "../data/furniture";
import { ARViewer } from "../components/ARViewer/ARViewer";

export default function ARPage() {
  const { id } = useParams();
  const item = furnitureData.find((f) => f.id === id);

  if (!item) {
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
      <h1 style={{ margin: "16px 0 24px" }}>{item.name}</h1>
      <ARViewer model={item.model} name={item.name} />
    </div>
  );
}