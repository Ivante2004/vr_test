import type { Furniture } from "../types/furniture";

export const furnitureData: Furniture[] = [
  {
    id: "chair-1",
    name: "Дизайнерское кресло",
    description: "Удобное кресло из Blender для вашего интерьера.",
    category: "Кресла",
    model: `${import.meta.env.BASE_URL}models/chair.glb`,
    image: `${import.meta.env.BASE_URL}images/chair.jpg`,
    price: 15900,
  },
];