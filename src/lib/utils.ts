import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { randomBytes } from "node:crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function slugify(val: string): string {
  return val
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}


export function generateOrderNumber(){
  const now = new Date()
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")

  const datePart = `${year}${month}${day}`
  const randomPart = randomBytes(4).toString("hex").toUpperCase()
  return `ADH-${datePart}-${randomPart}`
 
}