import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAPI() {
  return 'http://localhost:3000'
}

export function truncateString(str: string, maxLength: number) {
  if (str.length < maxLength) return str

  return str.substring(0, maxLength) + '...'
}
