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

export function getFirstDayFirstMomentOfMonth(monthId, year) {
  let firstDay = new Date();
  firstDay.setFullYear(year);
  firstDay.setMonth(monthId);
  firstDay.setDate(1);
  firstDay.setHours(0);
  firstDay.setMinutes(0);
  firstDay.setSeconds(0);
  firstDay.setMilliseconds(0);

  return firstDay;
}

export function getLastDayLastMomentOfMonth(monthId, year) {
  let lastDay = new Date();
  lastDay.setFullYear(year);
  lastDay.setDate(1); // edge case
  lastDay.setMonth(monthId + 1);
  lastDay.setDate(0);
  lastDay.setHours(23);
  lastDay.setMinutes(59);
  lastDay.setSeconds(59);
  lastDay.setMilliseconds(999);

  return lastDay;
}
