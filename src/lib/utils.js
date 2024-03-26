import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export function getRandomHSLAColors(
  count = 5,
  hue = 60,
  sat = 60,
  lum = 50,
  alpha = 0.8
) {
  let colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`hsla(${hue}, ${sat}%, ${lum}%, ${alpha})`);
    hue = hue - 360 / count;
  }

  return colors;
}
