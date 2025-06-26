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
import { ArrowLeft, Plus, X, Upload, Eye } from "lucide-react"

const themes = [
	{ value: "princess", label: "Princess", color: "#EC4899" },
	{ value: "superhero", label: "Superhero", color: "#3B82F6" },
	{ value: "unicorn", label: "Unicorn", color: "#8B5CF6" },
	{ value: "pirate", label: "Pirate", color: "#F59E0B" },
	{ value: "fairy", label: "Fairy Tale", color: "#10B981" },
]

export default function CreateBirthdayEvent() {
	const router = useRouter()
	const [ formData, setFormData ] = useState({
		title: "",
		theme: "",
		ageGroup: "",
		duration: "",
		price: "",
		description: "",
		highlights: [ "" ],
		includes: [ "" ],
		policies: [ "" ],
		isActive: true,
	})

	const [ previewMode, setPreviewMode ] = useState(false)

	const handleAddItem = (field) => {
		setFormData({
			...formData,
			[ field ]: [ ...formData[ field ], "" ],
		})
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
		<div className="space-y-6">
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
				<div className="flex space-x-3">
					<Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
						<Eye className="h-4 w-4 mr-2" />
						{previewMode ? "Edit Mode" : "Preview"}
					</Button>
					<Button onClick={handleSubmit} className="bg-pink-600 hover:bg-pink-700">
						Create Event
					</Button>
				</div>
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

							<div>
								<Label htmlFor="theme">Theme</Label>
								<Select value={formData.theme} onValueChange={(value) => setFormData({ ...formData, theme: value })}>
									<SelectTrigger>
										<SelectValue placeholder="Select a theme" />
									</SelectTrigger>
									<SelectContent>
										{themes.map((theme) => (
											<SelectItem key={theme.value} value={theme.value}>
												<div className="flex items-center space-x-2">
													<div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.color }} />
													<span>{theme.label}</span>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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
									<Label htmlFor="duration">Duration</Label>
									<Input
										id="duration"
										placeholder="e.g., 3 hours"
										value={formData.duration}
										onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="price">Price ($)</Label>
								<Input
									id="price"
									type="number"
									placeholder="299"
									value={formData.price}
									onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
							<div>
								<div className="flex items-center justify-between mb-3">
									<Label>Highlights</Label>
									<Button size="sm" variant="outline" onClick={() => handleAddItem("highlights")}>
										<Plus className="h-4 w-4 mr-1" />
										Add
									</Button>
								</div>
								<div className="space-y-2">
									{formData.highlights.map((highlight, index) => (
										<div key={index} className="flex items-center space-x-2">
											<Input
												placeholder="Enter highlight..."
												value={highlight}
												onChange={(e) => handleItemChange("highlights", index, e.target.value)}
											/>
											{formData.highlights.length > 1 && (
												<Button size="sm" variant="ghost" onClick={() => handleRemoveItem("highlights", index)}>
													<X className="h-4 w-4" />
												</Button>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Includes */}
							<div>
								<div className="flex items-center justify-between mb-3">
									<Label>Includes</Label>
									<Button size="sm" variant="outline" onClick={() => handleAddItem("includes")}>
										<Plus className="h-4 w-4 mr-1" />
										Add
									</Button>
								</div>
								<div className="space-y-2">
									{formData.includes.map((include, index) => (
										<div key={index} className="flex items-center space-x-2">
											<Input
												placeholder="Enter inclusion..."
												value={include}
												onChange={(e) => handleItemChange("includes", index, e.target.value)}
											/>
											{formData.includes.length > 1 && (
												<Button size="sm" variant="ghost" onClick={() => handleRemoveItem("includes", index)}>
													<X className="h-4 w-4" />
												</Button>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Policies */}
							<div>
								<div className="flex items-center justify-between mb-3">
									<Label>Policies</Label>
									<Button size="sm" variant="outline" onClick={() => handleAddItem("policies")}>
										<Plus className="h-4 w-4 mr-1" />
										Add
									</Button>
								</div>
								<div className="space-y-2">
									{formData.policies.map((policy, index) => (
										<div key={index} className="flex items-center space-x-2">
											<Input
												placeholder="Enter policy..."
												value={policy}
												onChange={(e) => handleItemChange("policies", index, e.target.value)}
											/>
											{formData.policies.length > 1 && (
												<Button size="sm" variant="ghost" onClick={() => handleRemoveItem("policies", index)}>
													<X className="h-4 w-4" />
												</Button>
											)}
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Settings */}
					<Card>
						<CardHeader>
							<CardTitle>Settings</CardTitle>
							<CardDescription>Configure event settings</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex items-center space-x-2">
								<Switch
									id="isActive"
									checked={formData.isActive}
									onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
								/>
								<Label htmlFor="isActive">Make event active immediately</Label>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Preview */}
				<div className="space-y-6">
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
