export const getImage = (src: string): HTMLImageElement | null => {
const img = new Image();
  img.src = src;
  return img;
}