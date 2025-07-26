import { z } from "zod"

export const birthdayEventSchema = z.object({
	title: z.string().min(1, "Title is required"),
	ageGroup: z.enum(["kids", "teens", "adults", "milestone"], {
		errorMap: () => ({ message: "Please select an age group" })
	}),
	duration: z.string().min(1, "Duration is required"),
	tags: z.string().optional(),
	description: z.string().min(1, "Description is required"),
	city: z.string({
		required_error: "Please select a city",
		invalid_type_error: "city must be a string",
	}).min(1, "Please select a city"),
	discount: z.string().optional(),
	isActive: z.boolean(),
	banner: z.custom<File[]>().refine((files) => files.length > 0, {
		message: "Please upload at least one banner image"
	}),
	coreActivity: z.array(z.string().min(1, "Activity cannot be empty")).min(1, "At least one activity required"),
})