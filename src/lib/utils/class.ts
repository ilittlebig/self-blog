/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-24
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
