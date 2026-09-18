export interface ColorVariant {
  id: string;
  colorName: string;
  previewImage: string; // Картинка плашки цвета (из public/images/colors/)
  model: string;        // 3D-модель для этого цвета (.glb)
}

export interface Furniture {
  id: string;
  name: string;
  description: string;
  category: string;
  mainImage: string;    // Общая картинка для каталога (Loft_mini-yaphik.jpg)
  price: number;
  variants: ColorVariant[];
}