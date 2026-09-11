import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import ARPage from "./pages/ARPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ar/:id" element={<ARPage />} />
      </Routes>
    </BrowserRouter>
  );
}