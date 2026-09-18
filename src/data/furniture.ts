import type { Furniture } from "../types/furniture";

export const furnitureData: Furniture[] = [
  {
    id: "chair-1",
    name: "Компьютерный стол, Лофт-Мини с ящиком",
    description: `Компактный компьютерный стол с ящиком Лофт-мини, хорошо впишется в маленькой комнате. Можно использовать в качестве

письменного стола,
для работы с ноутбуком,
идеально подходит в качестве туалетного столика, добавив зеркало,
рабочий стол для швейной машинки, рукоделия и т.д.

Вместительный выдвижной ящик на шариковых направляющих, полного выдвижения, можно использовать:
для канцтоваров,
косметики,
наборов для укладки волос,
мелких гаджетов`,
    category: "Компьютерный стол",
    price: 3015,
    // Основная картинка для каталога
    mainImage: `${import.meta.env.BASE_URL}images/Loft_mini-yaphik.jpg`,
    variants: [
      {
        id: "oak-gold",
        colorName: "Дуб крафт золотой",
        previewImage: `${import.meta.env.BASE_URL}images/colors/loft-minni-graphite-1.jpg`,
        model: `${import.meta.env.BASE_URL}models/loft-minni-graphite.glb`,
      },
      {
        id: "oak-white",
        colorName: "Дуб крафт золотой, белый",
        previewImage: `${import.meta.env.BASE_URL}images/colors/white.jpg`,
        model: `${import.meta.env.BASE_URL}models/loft-minni-white.glb`,
      },
      {
        id: "oak-graphite",
        colorName: "Дуб крафт золотой, графит",
        previewImage: `${import.meta.env.BASE_URL}images/colors/oak.jpg`,
        model: `${import.meta.env.BASE_URL}models/loft-minni-oak.glb`,
      },
    ],
  },
];