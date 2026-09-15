import type { Furniture } from "../types/furniture";

export const furnitureData: Furniture[] = [
  {
    id: "chair-1",
    name: "Компьютерный стол, Лофт-Мини с ящиком",
    description: `Компактный компьютерный стол с ящиком Лофт-мини...`,
    category: "Компьютерный стол",
    price: 3015,
    variants: [
      {
        id: "oak-graphite",
        colorName: "Дуб крафт золотой",
        previewImage: `${import.meta.env.BASE_URL}images/colors/loft-minni-graphite-1.jpg`,
        model: `${import.meta.env.BASE_URL}models/loft-minni-graphite.glb`,
      },
      {
        id: "white",
        colorName: "Дуб крафт золотой, белый",
        previewImage: `${import.meta.env.BASE_URL}images/colors/white.jpg`,
        model: `${import.meta.env.BASE_URL}models/loft-minni-white.glb`,
      },
      {
        id: "oak",
        colorName: "Дуб крафт золотой, графит",
        previewImage: `${import.meta.env.BASE_URL}images/colors/oak.jpg`,
        model: `${import.meta.env.BASE_URL}models/loft-minni-oak.glb`,
      },
      
    ],
  },
];