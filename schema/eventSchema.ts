import { z } from "zod"

export const birthdayEventSchema = z.object({
	title: z.string().min(1, "Title is required"),
	ageGroup: z.enum(["kids", "teens", "adult", "milestone"], {
		errorMap: () => ({ message: "Please select an age group" })
	}),
	subCategory: z.enum(["Popular Among Boys", "Popular Among Girls", "All-time Classics"]).optional(),
	duration: z.string().min(1, "Duration is required"),
	tags: z.string().optional(),
	description: z.string().min(1, "Description is required"),
	city: z.string({
		required_error: "Please select a city",
		invalid_type_error: "city must be a string",
	}).min(1, "Please select a city"),
	discount: z.string().optional(),
	banner: z.custom<File[]>().refine((files) => files.length > 0, {
		message: "Please upload at least one banner image"
	}),
	coreActivity: z.array(z.string().min(1, "Activity cannot be empty")).min(1, "At least one activity required"),
})
	.superRefine((data, ctx) => {
		if (data.ageGroup === "kids" && !data.subCategory) {
			ctx.addIssue({
				path: ["subCategory"],
				code: z.ZodIssueCode.custom,
				message: "Please select a subcategory for kids",
			});
		}
	});