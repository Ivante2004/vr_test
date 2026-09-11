import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Furniture<span>AR</span>
        </Link>
      </div>
    </header>
  );
}