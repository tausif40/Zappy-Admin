"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X, Upload, Trash2, LoaderCircle, Image } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { birthdayEventSchema } from "@/schema/eventSchema"
import { useDispatch, useSelector } from "react-redux"
import { createBirthDayEvent } from "@/store/features/event-slice"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { getCategory } from "@/store/features/addOns-slice"
import { ScrollArea } from "@/components/ui/scroll-area"

const city = [
	{ _id: 'delhi', name: "Delhi" },
	{ _id: 'indore', name: "Indore" },
	{ _id: 'bangalore', name: "Bangalore" },
	{ _id: 'hyderabad', name: "Hyderabad" },
	{ _id: 'chennai', name: "Chennai" },
	{ _id: 'kolkata', name: "Kolkata" },
	{ _id: 'pune', name: "Pune" },
	{ _id: 'ahmedabad', name: "Ahmedabad" },
	{ _id: 'lucknow', name: "Lucknow" }
]

export default function CreateBirthdayEvent() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { toast } = useToast();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ searchAddOnsCategory, setSearchAddOnsCategory ] = useState("")

	const addonCategories = useSelector((state) => state.addOnsSlice.category);
	// console.log(addonCategories);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(birthdayEventSchema),
		defaultValues: {
			city: "",
			banner: [],
			addons: []
		}
	})

	const {
		fields: activityFields,
		append: addCoreActivity,
		remove: removeCoreActivity
	} = useFieldArray({
		control,
		name: "coreActivity"
	})

	useEffect(() => {
		if (activityFields.length === 0) {
			addCoreActivity("")
		}
	}, [])

	useEffect(() => {
		dispatch(getCategory());
	}, [ dispatch ]);

	const banner = watch("banner") || []
	const ageGroup = watch("ageGroup");
	const selectedAddons = watch("addons");
	const formValue = watch();
	// console.log("errors: ", errors)
	// console.log("selected Addons: ", selectedAddons)

	const onSubmit = async (data) => {
		const activePackages = Object.values(packages).filter(pkg => pkg.isActive).map(({ isActive, ...rest }) => rest)

		// console.log("Form data:", data)

		const formData = new FormData()
		formData.append("title", data.title)
		formData.append("ageGroup", data.ageGroup)
		if (ageGroup === 'kids') formData.append("subCategory", data.subCategory)
		formData.append("duration", data.duration)
		formData.append("tags", data.tags || "")
		formData.append("description", data.description)
		formData.append("city", data.city)
		formData.append("discount", data.discount || "")
		// formData.append("isActive", String(data.isActive))
		data.coreActivity.forEach((act, i) =>
			formData.append(`coreActivity[${i}]`, act)
		)
		Array.from(data.banner).forEach((file) => {
			formData.append("banner", file)
		})
		Array.from(data.addons).forEach((cat) => {
			formData.append("addOns", cat)
		})
		formData.append("tiers", JSON.stringify(activePackages))

		try {
			setIsLoading(true)
			const res = await dispatch(createBirthDayEvent(formData)).unwrap();
			console.log(res);
			if (res.status === 201) {
				toast({ variant: "success", title: "Event created Successful!" });
			}
		} catch (error) {
			console.log(error);
			toast({ variant: "destructive", title: error?.message || "Event create failed!" });
		} finally {
			setIsLoading(false)
		}

	}

	const [ packages, setPackages ] = useState({
		silver: { name: "silver", isActive: true, price: '', guest: '', description: "", features: [ "" ] },
		gold: { name: "gold", isActive: false, price: '', guest: '', description: "", features: [ "" ] },
		platinum: { name: "platinum", isActive: false, price: '', guest: '', description: "", features: [ "" ] },
	})

	const handlePackageChange = (packageType, field, value) => {
		setPackages((prev) => ({
			...prev,
			[ packageType ]: { ...prev[ packageType ], [ field ]: value },
		}))
	}

	const handlePackageFeatureChange = (packageType, index, value) => {
		setPackages((prev) => ({
			...prev,
			[ packageType ]: {
				...prev[ packageType ], features: prev[ packageType ].features.map((feature, i) => (i === index ? value : feature)),
			},
		}))
	}

	const addPackageFeature = (packageType) => {
		setPackages((prev) => ({
			...prev, [ packageType ]: { ...prev[ packageType ], features: [ ...prev[ packageType ].features, "" ] },
		}))
	}

	const removePackageFeature = (packageType, index) => {
		setPackages((prev) => ({
			...prev,
			[ packageType ]: {
				...prev[ packageType ], features: prev[ packageType ].features.filter((_, i) => i !== index),
			},
		}))
	}
	const packageBorderColors = {
		silver: "border-ring bg-purple-50/20",
		gold: "border-yellow-400 bg-yellow-50/20",
		platinum: "border-teal-400 bg-teal-50/20",
	}

	const filteredData = addonCategories?.data?.filter((item) =>
		item.name.toLowerCase().includes(searchAddOnsCategory.toLowerCase())
	)

	const handleCheckboxChange = (checked, value) => {
		const currentValues = selectedAddons || [];
		if (checked) {
			setValue("addons", [ ...currentValues, value ]);
		} else {
			setValue("addons", currentValues.filter((v) => v !== value));
		}
	};

	return (
		<div className="min-h-screen space-y-6">
			{/* Header */}
			<Button variant="secondary" onClick={() => router.back()}>
				<ArrowLeft className="h-4 w-4 mr-2" />
				Back
			</Button>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">

					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Birthday Event</h1>
						<p className="text-gray-600 dark:text-gray-400">Add a new birthday party event</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
					{/* Basic Information */}
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
							<CardDescription>Enter the basic details for the birthday event</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="title" className="required">Event Title</Label>
								<Input
									{...register("title")}
									id="title"
									placeholder="e.g., Princess Birthday Party"
								/>
								{errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
							</div>

							<div className={`grid gap-4 ${ageGroup === "kids" ? ' grid-cols-2' : ' grid-cols-1'}`}>
								<div>
									<Label htmlFor="ageGroup" className="required">Age Group</Label>
									<Select className='w-full' onValueChange={(value) => setValue("ageGroup", value, { shouldValidate: true })}>
										<SelectTrigger>
											<SelectValue placeholder="Select ageGroup" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="kids">Kids (1-12)</SelectItem>
											<SelectItem value="teens">Teens (13-19)</SelectItem>
											<SelectItem value="adult">Adults (20+)</SelectItem>
											<SelectItem value="milestone">Milestone</SelectItem>
										</SelectContent>
									</Select>
									{errors.ageGroup && <p className="text-red-500 text-sm">{errors.ageGroup.message}</p>}
								</div>

								{ageGroup === "kids" && (
									<div>
										<Label htmlFor="subCategory" className="required">Subcategory</Label>
										<Select onValueChange={(value) => setValue("subCategory", value, { shouldValidate: true })}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Subcategory" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="All-time Classics">All-time Classics</SelectItem>
												<SelectItem value="Popular Among Boys">Popular Among Boys</SelectItem>
												<SelectItem value="Popular Among Girls">Popular Among Girls</SelectItem>
											</SelectContent>
										</Select>
										{errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory.message}</p>}
									</div>
								)}

							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="discount">Discount (%) <span className="text-sm text-gray-500">(optional)</span></Label>
									<Input
										{...register("discount")}
										type="number"
										id="discount"
										placeholder="percent"
									/>
								</div>
								<div>
									<Label htmlFor="tags">Add Tags <span className="text-xs text-gray-500">(It will show top of card)</span></Label>
									<Input
										{...register("tags")}
										id="tags"
										type="text"
										placeholder="New Arrival"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-x-4">
								<div className='w-full'>
									<Label htmlFor="city" className="required">City</Label>
									<Select className='w-full' onValueChange={(value) => setValue("city", value, { shouldValidate: true })}>
										<SelectTrigger>
											<SelectValue placeholder="Select a city" />
										</SelectTrigger>
										<SelectContent>
											{city.map((city) => (
												<SelectItem key={city._id} value={city._id}>{city.name}</SelectItem>
											))}
										</SelectContent>
									</Select>
									{errors.city && (<p className="text-red-500 text-sm">{errors.city.message}</p>)}
								</div>

								<div>
									<Label htmlFor="duration" className="required">Duration <span className="text-sm text-gray-500">(hour)</span></Label>
									<Input
										{...register("duration")}
										type="number"
										id="duration"
										placeholder="e.g., 2, 3.5..."
									/>
									{errors.duration && (<p className="text-red-500 text-sm">{errors.duration.message}</p>
									)}
								</div>
							</div>

							<div className="">
								<div>
									<Label htmlFor="banner" className="required">Upload banner</Label>
									<Controller
										name="banner"
										control={control}
										defaultValue={[]}
										render={({ field }) => (
											<Input
												type="file"
												multiple
												accept="image/*"
												onChange={(e) => {
													setValue("banner", Array.from(e.target.files ?? []), {
														shouldValidate: true
													})
												}}
											/>
										)}
									/>
									{errors.banner && (<p className="text-red-500 text-sm">{errors.banner.message}</p>)}
								</div>
								{banner.length > 0 && (
									<div className="flex gap-4 flex-wrap mt-2">
										{banner.map((file, idx) => (
											<img
												key={idx}
												src={URL.createObjectURL(file)}
												className="aspect-video w-20 rounded object-cover border"
											/>
										))}
									</div>
								)}
							</div>

							<div>
								<Label htmlFor="description" className="required">Description</Label>
								<Textarea
									{...register("description")}
									id="description"
									placeholder="Describe the birthday event experience..."
									rows={4}
								/>
								{errors.description && (<p className="text-red-500 text-sm">{errors.description.message}</p>)}
							</div>

							<div>
								<Label className="required">Core Activities</Label>
								<div className="space-y-2 mt-2">
									{activityFields.map((field, index) => (
										<div key={field.id} className="flex flex-col gap-1">
											<div key={field.id} className="flex items-center space-x-2">
												<Input
													{...register(`coreActivity.${index}`)}
													placeholder="Enter activity"
												/>
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => removeCoreActivity(index)}
													disabled={activityFields.length === 1}
												>
													<Trash2 className="h-4 w-4 text-red-500" />
												</Button>
											</div>
											{errors.coreActivity?.[ index ] && (<p className="text-red-500 text-sm">{errors.coreActivity[ index ]?.message}	</p>)}
										</div>
									))}
									<Button type="button" variant="outline" size="sm" onClick={() => addCoreActivity("")}>
										Add Activity
									</Button>
								</div>

								{
									errors.coreActivity?.message && (
										<p className="text-sm text-red-500">{errors.coreActivity.message}</p>
									)
								}
							</div>

						</CardContent>
					</Card>

					{/* select add-ons */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg font-semibold">Add AddOns Categories</CardTitle>
							<CardDescription className="text-sm text-gray-500">
								Select the add-on categories that will be available for this event
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="mb-4 flex gap-4">
								<Input
									type="search"
									placeholder="search category..."
									value={searchAddOnsCategory}
									onChange={(e) => setSearchAddOnsCategory(e.target.value)}
								/>
								<Button variant='secondary' type="button">Search</Button>
							</div>
							<section className="border p-4 rounded-md">
								<ScrollArea className="h-[180px]">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{addonCategories?.isLoading ? (
											<p>Loading categories...</p>
										) : addonCategories?.data && addonCategories?.data?.length > 0 ? (
											filteredData?.map((cat) => {
												const isChecked = selectedAddons.includes(cat.id);
												return (
													<div key={cat.id} className="flex items-center space-x-2 transition" >
														<Checkbox
															id={cat.id}
															checked={isChecked}
															onCheckedChange={(checked) => handleCheckboxChange(checked, cat.id)}
														/>
														<Label
															htmlFor={cat.id}
															className="cursor-pointer text-gray-700 capitalize"
														>
															{cat.name}
														</Label>
													</div>
												);
											})
										) : (
											<p>No categories available</p>
										)}
									</div>
								</ScrollArea>
							</section>
						</CardContent>
					</Card>

					{/* Package Configuration */}
					<Card>
						<CardHeader>
							<CardTitle>Package Configuration</CardTitle>
							<CardDescription>Set up your Silver, Gold, and Platinum packages</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{Object.entries(packages).map(([ packageType, packageData ]) => (
								<div key={packageType} className={`border rounded-lg p-4 ${packageBorderColors[ packageType ] || "border-gray-300"} ${!packageData.isActive ? "opacity-50" : ""}`}>
									<div className="flex justify-between items-center mb-4">
										<p className={`font-semibold text-lg capitalize ${packageType === 'silver' && 'required'}`}>{packageType} Package</p>
										<Switch
											checked={packageData.isActive}
											disabled={packageType === "silver"}
											onCheckedChange={(value) => {
												if (packageType !== "silver") {
													setPackages((prev) => ({
														...prev,
														[ packageType ]: {
															...prev[ packageType ],
															isActive: value,
														},
													}));
												}
											}}
										/>
									</div>
									<div className={`${!packageData.isActive && "pointer-events-none"}`}>
										{/* <div className="grid gap-4 mb-4">
											<div>
												<Label htmlFor={`${packageType}-name`} >Package Name</Label>
												<Input
													id={`${packageType}-name`}
													value={packageData.name}
													onChange={(e) => handlePackageChange(packageType, "name", e.target.value)}
													placeholder="Package name"
													className="mt-2"
													required={packageData.isActive}
												/>
											</div>
										</div> */}
										<div className="grid md:grid-cols-2 gap-4 mb-4">
											<div>
												<Label htmlFor={`${packageType}-price`} >Price (₹)</Label>
												<Input
													id={`${packageType}-price`}
													type="number"
													value={packageData.price}
													onChange={(e) => handlePackageChange(packageType, "price", Number.parseInt(e.target.value) || 0)}
													placeholder="Package price"
													className="mt-2"
													required={packageData.isActive}
												/>
											</div>
											<div>
												<Label htmlFor="guest">Max Guest</Label>
												<Input
													id="guest"
													placeholder="e.g., 10-15 guest"
													value={packageData.guest}
													onChange={(e) => handlePackageChange(packageType, "guest", e.target.value)}
													className="mt-2"
													required={packageData.isActive}
												/>
											</div>
										</div>
										<div className="mb-4">
											<Label htmlFor="guest" className="flex justify-between mb-2">
												<p>Description <span className="text-sm text-gray-500 font-light">(max 120 characters)</span></p>
												<p className="text-right text-xs text-muted-foreground mt-1"> {packageData.description?.length || 0}/120</p>
											</Label>
											<Textarea
												id="description"
												placeholder="120 characters max"
												value={packageData.description}
												onChange={(e) => {
													if (e.target.value.length <= 120) {
														handlePackageChange(packageType, "description", e.target.value)
													}
												}}
												rows={2}
												required={packageData.isActive}
											/>
										</div>
										<div>
											<Label >Features</Label>
											<div className="">
												{packageData.features.map((feature, index) => (
													<div key={index} className="flex items-center space-x-2">
														<Input
															value={feature}
															onChange={(e) => handlePackageFeatureChange(packageType, index, e.target.value)}
															placeholder="Enter feature"
															className="mt-2"
															required={packageData.isActive}
														/>
														<Button
															type="button"
															variant="outline"
															size="sm"
															onClick={() => removePackageFeature(packageType, index)}
															disabled={packageData.features.length === 1}
														>
															<Trash2 className="h-4 w-4 text-red-500" />
														</Button>
													</div>
												))}
												<Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => addPackageFeature(packageType)}>
													<Plus className="h-4 w-4 mr-2" />
													Add Feature
												</Button>
											</div>
										</div>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* is active */}
					{/* <div className="border bg-background rounded-lg p-4">
						<p className="text-lg text-foreground font-semibold">Is Active</p>
						<p className="text-sm text-muted-foreground">It will show on the event card</p>

						<div className="flex items-center space-x-2 mt-4">
							<Label className="text-md text-muted-foreground">Status : </Label>
							<Switch
								checked={watch("isActive")}
								onCheckedChange={(val) => setValue("isActive", val)}
							/>
						</div>
					</div> */}

					<div className="flex justify-end">
						<Button type="submit" size='lg' className="text-lg" disabled={isLoading}>
							{isLoading ? <>Creating  <LoaderCircle className='animate-spin h-4 w-4 ml-2' /></> : 'Create'}
						</Button>
					</div>

				</form>

				{/* Preview */}
				<div className="space-y-6 sticky top-4 h-96">
					<Card>
						<CardHeader>
							<CardTitle>Event Preview</CardTitle>
							<CardDescription>Live preview of your event</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">

								<div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
									{banner.length > 0
										? <div className="w-full">
											<img src={URL.createObjectURL(banner[ 0 ])} className="w-full rounded object-cover border" />
										</div>
										: <div className="text-center">
											<Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
											<p className="text-sm text-gray-500">event image</p>
										</div>
									}
								</div>
								<div className="grid grid-cols-2 gap-2 text-sm">
									<div>
										<span className="text-gray-600">Age:</span>
										<p className="font-medium">{formValue.ageGroup || "Not set"}</p>
									</div>
									<div>
										<span className="text-gray-600">Duration:</span>
										<p className="font-medium">{formValue.duration || "Not set"}</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
