"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Upload, Eye, CircleCheckBig, Dot } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const themes = [
	{ value: "princess", label: "Princess", color: "#EC4899" },
	{ value: "superhero", label: "Superhero", color: "#3B82F6" },
	{ value: "unicorn", label: "Unicorn", color: "#8B5CF6" },
	{ value: "pirate", label: "Pirate", color: "#F59E0B" },
	{ value: "fairy", label: "Fairy Tale", color: "#10B981" },
]
const allOptions = [
	'React',
	'Next.js',
	'Vue',
	'Angular',
	'Svelte',
	'JavaScript',
	'TypeScript',
	'Tailwind',
	'Bootstrap',
	'Node.js',
	'Express',
	'MongoDB',
	'PostgreSQL',
	'Python',
	'Django',
	'Flask',
]

const tags = [
	"Birthday Parties",
	"Themed Events",
	"New Arrival",
	"Top Rated",
	"Educational",
	"Budget Friendly",
	"Creative Pick",
	"Party Vibe",
]

export default function CreateBirthdayEvent() {
	const router = useRouter()
	const [ searchTerm, setSearchTerm ] = useState('')
	const [ selectedOptions, setSelectedOptions ] = useState([])
	const [ showResults, setShowResults ] = useState(false)
	const [ formData, setFormData ] = useState({
		title: "",
		theme: "",
		ageGroup: "",
		guests: "",
		duration: "",
		price: "",
		banner: "",
		description: "",
		highlights: [ "" ],
		includes: [ "" ],
		policies: [ "" ],
		isActive: true,
	})

	const [ previewMode, setPreviewMode ] = useState(false)

	const filteredOptions = allOptions.filter(option =>
		option.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const toggleOption = (value) => {
		setSelectedOptions(prev =>
			prev.includes(value) ? prev.filter(v => v !== value) : [ ...prev, value ]
		)
	}
	console.log('Selected Options:', selectedOptions)

	const handleConfirm = () => {
		console.log('Selected Options:', selectedOptions)
		setShowResults(true)
	}

	const handleRemoveItem = (field, index) => {
		const newItems = formData[ field ].filter((_, i) => i !== index)
		setFormData({
			...formData,
			[ field ]: newItems,
		})
	}

	const handleItemChange = (field, index, value) => {
		const newItems = [ ...formData[ field ] ]
		newItems[ index ] = value
		setFormData({
			...formData,
			[ field ]: newItems,
		})
	}

	const handleSubmit = () => {
		console.log("Creating birthday event:", formData)
		router.push("/admin/dashboard/birthday-events")
	}

	const selectedTheme = themes.find((t) => t.value === formData.theme)

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
				{/* <div className="flex space-x-3">
					<Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
						<Eye className="h-4 w-4 mr-2" />
						{previewMode ? "Edit Mode" : "Preview"}
					</Button>
					<Button onClick={handleSubmit} className="bg-pink-600 hover:bg-pink-700">
						Create Event
					</Button>
				</div> */}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Form */}
				<div className="lg:col-span-2 space-y-6">
					{/* Basic Information */}
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
							<CardDescription>Enter the basic details for the birthday event</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="title">Event Title</Label>
								<Input
									id="title"
									placeholder="e.g., Princess Birthday Party"
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="ageGroup">Age Group</Label>
									<Input
										id="ageGroup"
										placeholder="e.g., 3-8 years"
										value={formData.ageGroup}
										onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
									/>
								</div>
								<div>
									<Label htmlFor="guests">Max Guests</Label>
									<Input
										id="guests"
										placeholder="e.g., 10-15 guests"
										value={formData.guests}
										onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
									/>
								</div>

							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="duration">Duration</Label>
									<Input
										id="duration"
										placeholder="e.g., 3 hours"
										value={formData.duration}
										onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
									/>
								</div>
								<div>
									<Label htmlFor="price">Price</Label>
									<Input
										id="price"
										type="number"
										placeholder="299"
										value={formData.price}
										onChange={(e) => setFormData({ ...formData, price: e.target.value })}
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="banner">Upload banner</Label>
								<Input
									type="file"
									id="banner"
									placeholder="upload image"
									value={formData.banner}
									onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
								/>
							</div>

							<div>
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									placeholder="Describe the birthday event experience..."
									value={formData.description}
									onChange={(e) => setFormData({ ...formData, description: e.target.value })}
									rows={4}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Event Details */}
					<Card>
						<CardHeader>
							<CardTitle>Event Details</CardTitle>
							<CardDescription>Add highlights, inclusions, and policies</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Highlights */}
							<div className="space-y-2">
								<Dialog>
									<div className="flex items-center justify-between mb-3">
										<p className="font-semibold text-lg text-muted-foreground">Highlights :</p>
										<DialogTrigger asChild>
											<Button variant="outline" size='sm'><Plus className="h-4 w-4 mr-1" /> Add</Button>
										</DialogTrigger>
									</div>

									<DialogContent className="max-w-lg">
										<DialogHeader>
											<DialogTitle>Add Highlights Point</DialogTitle>
										</DialogHeader>

										<Input
											placeholder="Search..."
											value={searchTerm}
											onChange={e => setSearchTerm(e.target.value)}
											className="mb-4"
										/>

										<ScrollArea className="h-60">
											<div className="grid grid-cols-2 gap-4">
												{filteredOptions.map(option => (
													<label key={option} className="flex items-center space-x-2 hover:bg-gray-100 rounded-sm px-2">
														<Checkbox
															checked={selectedOptions.includes(option)}
															onCheckedChange={() => toggleOption(option)}
														/>
														<span>{option}</span>
													</label>
												))}
											</div>
										</ScrollArea>

										<Button className="mt-4 w-full" onClick={handleConfirm}>
											Confirm Selection
										</Button>
									</DialogContent>
								</Dialog>

								<Card className="px-4 py-2 grid grid-cols-2 gap-1 max-h-52 overflow-y-auto">
									{selectedOptions.map((value) => (
										<div className="text-sm text-gray-700 flex items-center">
											{value} &nbsp; <X size={12} className="text-red-500 cursor-pointer" />
										</div>
									))}
								</Card>

							</div>

							{/* Includes */}
							{/* <div className="flex items-center justify-between mb-3">
									<Label>Includes</Label>
									<Button size="sm" variant="outline" onClick={() => handleAddItem("includes")}>
										<Plus className="h-4 w-4 mr-1" />
										Add
									</Button>
								</div> */}
							<div className="space-y-2">
								<Dialog>
									<div className="flex items-center justify-between mb-3">
										<p className="font-semibold text-lg text-muted-foreground">Includes :</p>
										<DialogTrigger asChild>
											<Button variant="outline" size='sm'><Plus className="h-4 w-4 mr-1" /> Add</Button>
										</DialogTrigger>
									</div>

									<DialogContent className="max-w-lg">
										<DialogHeader>
											<DialogTitle>Add Includes Point</DialogTitle>
										</DialogHeader>

										<Input
											placeholder="Search..."
											value={searchTerm}
											onChange={e => setSearchTerm(e.target.value)}
											className="mb-4"
										/>

										<ScrollArea className="h-60">
											<div className="grid grid-cols-2 gap-4">
												{filteredOptions.map(option => (
													<label key={option} className="flex items-center space-x-2 hover:bg-gray-100 rounded-sm px-2">
														<Checkbox
															checked={selectedOptions.includes(option)}
															onCheckedChange={() => toggleOption(option)}
														/>
														<span>{option}</span>
													</label>
												))}
											</div>
										</ScrollArea>

										<Button className="mt-4 w-full" onClick={handleConfirm}>
											Confirm Selection
										</Button>
									</DialogContent>
								</Dialog>

								<Card className="px-4 py-2 grid grid-cols-2 gap-1 max-h-52 overflow-y-auto">
									{selectedOptions.map((value) => (
										<div className="text-sm text-gray-700 flex items-center">
											{value} &nbsp; <X size={12} className="text-red-500 cursor-pointer" />
										</div>
									))}
								</Card>
							</div>

							{/* Policies */}
							<div>
								<Dialog>
									<div className="flex items-center justify-between mb-3">
										<p className="font-semibold text-lg text-muted-foreground">Policy :</p>
										<DialogTrigger asChild>
											<Button variant="outline" size='sm'><Plus className="h-4 w-4 mr-1" /> Add</Button>
										</DialogTrigger>
									</div>

									<DialogContent className="max-w-lg">
										<DialogHeader>
											<DialogTitle>Add Policy Point</DialogTitle>
										</DialogHeader>

										<Input
											placeholder="Search..."
											value={searchTerm}
											onChange={e => setSearchTerm(e.target.value)}
											className="mb-4"
										/>

										<ScrollArea className="h-60">
											<div className="grid grid-cols-2 gap-4">
												{filteredOptions.map(option => (
													<label key={option} className="flex items-center space-x-2 hover:bg-gray-100 rounded-sm px-2">
														<Checkbox
															checked={selectedOptions.includes(option)}
															onCheckedChange={() => toggleOption(option)}
														/>
														<span>{option}</span>
													</label>
												))}
											</div>
										</ScrollArea>

										<Button className="mt-4 w-full" onClick={handleConfirm}>
											Confirm Selection
										</Button>
									</DialogContent>
								</Dialog>

								<Card className="px-4 py-2 grid grid-cols-2 gap-1 max-h-52 overflow-y-auto">
									{selectedOptions.map((value) => (
										<div className="text-sm text-gray-700 flex items-center">
											{value} &nbsp; <X size={12} className="text-red-500 cursor-pointer" />
										</div>
									))}
								</Card>
							</div>
						</CardContent>
					</Card>

					{/* Tags */}
					<Card>
						<CardHeader>
							<CardTitle >Add Tags</CardTitle>
							<CardDescription>It will show top of card</CardDescription>
						</CardHeader>
						<CardContent>
							<RadioGroup className="grid grid-cols-2 gap-4">
								{tags.map((option) => (
									<div key={option} className="flex items-center space-x-2 text-muted-foreground">
										<RadioGroupItem value={option} id={option} />
										<Label htmlFor={option}>{option}</Label>
									</div>
								))}
							</RadioGroup>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Discount (Optional)</CardTitle>
							<CardDescription>Add discount offer</CardDescription>
						</CardHeader>
						<CardContent>
							<div>
								<Label htmlFor="discount">Discount (%)</Label>
								<Input
									type="number"
									id="discount"
									placeholder="percent"
								/>
							</div>
						</CardContent>
					</Card>

					<div className="flex justify-end">
						<Button size='lg' className="text-lg">
							Create
						</Button>
					</div>
				</div>

				{/* Preview */}
				<div className="space-y-6 sticky top-4 h-96">
					<Card>
						<CardHeader>
							<CardTitle>Event Preview</CardTitle>
							<CardDescription>Live preview of your event</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{/* Event Image Placeholder */}
								<div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
									<div className="text-center">
										<Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Upload event image</p>
									</div>
								</div>

								{/* Event Info */}
								<div>
									<h3 className="text-lg font-bold text-gray-900">{formData.title || "Event Title"}</h3>
									{selectedTheme && (
										<Badge
											variant="outline"
											className="mt-2"
											style={{ color: selectedTheme.color, borderColor: selectedTheme.color }}
										>
											{selectedTheme.label}
										</Badge>
									)}
								</div>

								<div className="grid grid-cols-2 gap-2 text-sm">
									<div>
										<span className="text-gray-600">Age:</span>
										<p className="font-medium">{formData.ageGroup || "Not set"}</p>
									</div>
									<div>
										<span className="text-gray-600">Duration:</span>
										<p className="font-medium">{formData.duration || "Not set"}</p>
									</div>
								</div>

								{formData.price && (
									<div className="text-center py-2">
										<span className="text-2xl font-bold text-green-600">${formData.price}</span>
									</div>
								)}

								{formData.description && (
									<div>
										<h4 className="font-semibold text-sm text-gray-600 mb-1">Description</h4>
										<p className="text-sm text-gray-700">{formData.description}</p>
									</div>
								)}

								{formData.highlights.some((h) => h.trim()) && (
									<div>
										<h4 className="font-semibold text-sm text-gray-600 mb-1">Highlights</h4>
										<ul className="text-sm text-gray-700 space-y-1">
											{formData.highlights
												.filter((h) => h.trim())
												.map((highlight, index) => (
													<li key={index} className="flex items-start">
														<span className="text-pink-500 mr-2">•</span>
														{highlight}
													</li>
												))}
										</ul>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
