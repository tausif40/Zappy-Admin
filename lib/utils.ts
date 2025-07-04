import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getQueryParams = (filterData: string) => {
	const queryParams = new URLSearchParams();

	Object.entries(filterData).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			queryParams.append(key, value.join(","));
		} else if (value !== undefined && value !== null) {
			queryParams.append(key, value);
		}
	});
	return queryParams.toString();
};
