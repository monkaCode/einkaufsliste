import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function relativeTimeFrom(date: Date, base: Date = new Date()): string {
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  const diffMs = date.getTime() - base.getTime();
  const diffSec = Math.round(diffMs / 1000);

  const divisions: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [unit, secondsInUnit] of divisions) {
    const value = Math.trunc(diffSec / secondsInUnit);
    if (value !== 0) return rtf.format(value, unit);
  }

  return rtf.format(0, "second");
}