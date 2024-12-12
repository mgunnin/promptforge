import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  )
  const day = date.getDate()
  return `${month} ${day}, ${year}`
}
