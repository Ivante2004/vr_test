export interface ColorVariant {
  id: string;
  colorName: string;
  previewImage: string; // Изображение иконки цвета (как на макете)
  model: string;        // Путь к .glb файлу данного цвета
}

export interface Furniture {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  variants: ColorVariant[]; // Список цветовых артикулов
}