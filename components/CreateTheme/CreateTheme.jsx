"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Palette, Star } from "lucide-react"

const mockThemes = [
	{
		id: 1,
		name: "Princess Paradise",
		description: "Magical princess theme with pink and gold decorations",
		category: "Birthday",
		color: "#FF69B4",
		price: 150,
		items: [ "Crown decorations", "Pink balloons", "Princess backdrop", "Fairy lights" ],
		isActive: true,
		isPopular: true,
		createdAt: "2024-01-15",
	},
	{
		id: 2,
		name: "Superhero Adventure",
		description: "Action-packed superhero theme with bold colors",
		category: "Birthday",
		color: "#FF4444",
		price: 180,
		items: [ "Superhero banners", "Action figures", "Comic book backdrop", "LED effects" ],
		isActive: true,
		isPopular: false,
		createdAt: "2024-01-10",
	},
	{
		id: 3,
		name: "Tropical Paradise",
		description: "Beach-themed decorations with tropical vibes",
		category: "Curated",
		color: "#00CED1",
		price: 200,
		items: [ "Palm leaves", "Tiki torches", "Beach balls", "Tropical flowers" ],
		isActive: true,
		isPopular: true,
		createdAt: "2024-01-08",
	},
	{
		id: 4,
		name: "Winter Wonderland",
		description: "Elegant winter theme with white and silver",
		category: "Curated",
		color: "#87CEEB",
		price: 220,
		items: [ "Snowflake decorations", "White draping", "Silver accents", "LED snowfall" ],
		isActive: false,
		isPopular: false,
		createdAt: "2024-01-05",
	},
]

export default function CreateTheme() {
	const [ themes, setThemes ] = useState(mockThemes)
	const [ searchTerm, setSearchTerm ] = useState("")
	const [ isCreateDialogOpen, setIsCreateDialogOpen ] = useState(false)
	const [ editingTheme, setEditingTheme ] = useState(null)
	const [ newTheme, setNewTheme ] = useState({
		name: "",
		description: "",
		category: "Birthday",
		color: "#FF69B4",
		price: "",
		items: [ "" ],
		isActive: true,
		isPopular: false,
	})

	const filteredThemes = themes.filter(
		(theme) =>
			theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			theme.category.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleAddItem = () => {
		setNewTheme({
			...newTheme,
			items: [ ...newTheme.items, "" ],
		})
	}

	const handleRemoveItem = (index) => {
		const updatedItems = newTheme.items.filter((_, i) => i !== index)
		setNewTheme({
			...newTheme,
			items: updatedItems,
		})
	}

	const handleItemChange = (index, value) => {
		const updatedItems = [ ...newTheme.items ]
		updatedItems[ index ] = value
		setNewTheme({
			...newTheme,
			items: updatedItems,
		})
	}

	const handleCreateTheme = () => {
		const theme = { id: themes.length + 1, ...newTheme, price: Number.parseFloat(newTheme.price), createdAt: new Date().toISOString().split("T")[ 0 ] }
		setThemes([ ...themes, theme ])
		setNewTheme({
			name: "",
			description: "",
			category: "Birthday",
			color: "#FF69B4",
			price: "",
			items: [ "" ],
			isActive: true,
			isPopular: false,
		})
		setIsCreateDialogOpen(false)
	}

	const handleToggleStatus = (id) => {
		setThemes(themes.map((theme) => (theme.id === id ? { ...theme, isActive: !theme.isActive } : theme)))
	}

	const handleDeleteTheme = (id) => {
		setThemes(themes.filter((theme) => theme.id !== id))
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Theme Management</h1>
					<p className="text-gray-600 dark:text-gray-400">Create and manage event themes</p>
				</div>
				<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-pink-600 hover:bg-pink-700">
							<Plus className="h-4 w-4 mr-2" />
							Create Theme
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>Create New Theme</DialogTitle>
							<DialogDescription>Add a new theme that can be used for events</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="name">Theme Name</Label>
									<Input
										id="name"
										placeholder="e.g., Princess Paradise"
										value={newTheme.name}
										onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
									/>
								</div>
								<div>
									<Label htmlFor="category">Category</Label>
									<select
										id="category"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
										value={newTheme.category}
										onChange={(e) => setNewTheme({ ...newTheme, category: e.target.value })}
									>
										<option value="Birthday">Birthday</option>
										<option value="Curated">Curated</option>
									</select>
								</div>
							</div>

							<div>
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									placeholder="Describe the theme..."
									value={newTheme.description}
									onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="color">Theme Color</Label>
									<div className="flex items-center space-x-2">
										<Input
											id="color"
											type="color"
											value={newTheme.color}
											onChange={(e) => setNewTheme({ ...newTheme, color: e.target.value })}
											className="w-16 h-10"
										/>
										<Input
											value={newTheme.color}
											onChange={(e) => setNewTheme({ ...newTheme, color: e.target.value })}
											placeholder="#FF69B4"
										/>
									</div>
								</div>
								<div>
									<Label htmlFor="price">Price ($)</Label>
									<Input
										id="price"
										type="number"
										placeholder="150"
										value={newTheme.price}
										onChange={(e) => setNewTheme({ ...newTheme, price: e.target.value })}
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between mb-3">
									<Label>Theme Items</Label>
									<Button size="sm" variant="outline" onClick={handleAddItem}>
										<Plus className="h-4 w-4 mr-1" />
										Add Item
									</Button>
								</div>
								<div className="space-y-2">
									{newTheme.items.map((item, index) => (
										<div key={index} className="flex items-center space-x-2">
											<Input
												placeholder="Enter theme item..."
												value={item}
												onChange={(e) => handleItemChange(index, e.target.value)}
											/>
											{newTheme.items.length > 1 && (
												<Button size="sm" variant="ghost" onClick={() => handleRemoveItem(index)}>
													<Trash2 className="h-4 w-4" />
												</Button>
											)}
										</div>
									))}
								</div>
							</div>

							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="isActive"
										checked={newTheme.isActive}
										onCheckedChange={(checked) => setNewTheme({ ...newTheme, isActive: checked })}
									/>
									<Label htmlFor="isActive">Active</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										id="isPopular"
										checked={newTheme.isPopular}
										onCheckedChange={(checked) => setNewTheme({ ...newTheme, isPopular: checked })}
									/>
									<Label htmlFor="isPopular">Mark as Popular</Label>
								</div>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={handleCreateTheme} className="bg-purple-600 hover:bg-purple-700">
								Create Theme
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Themes</CardTitle>
						<Palette className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{themes.length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Themes</CardTitle>
						<Eye className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{themes.filter((t) => t.isActive).length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Popular Themes</CardTitle>
						<Star className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{themes.filter((t) => t.isPopular).length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
						<span className="text-sm text-muted-foreground">$</span>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							${Math.round(themes.reduce((acc, t) => acc + t.price, 0) / themes.length)}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Search and Filters */}
			<Card>
				<CardHeader>
					<div className="flex items-center space-x-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								placeholder="Search themes..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Theme</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Items</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Created</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredThemes.map((theme) => (
								<TableRow key={theme.id}>
									<TableCell>
										<div className="flex items-center space-x-3">
											<div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.color }} />
											<div>
												<div className="font-medium flex items-center space-x-2">
													<span>{theme.name}</span>
													{theme.isPopular && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
												</div>
												<div className="text-sm text-gray-500">{theme.description}</div>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant="outline">{theme.category}</Badge>
									</TableCell>
									<TableCell>${theme.price}</TableCell>
									<TableCell>
										<div className="text-sm">
											{theme.items.slice(0, 2).join(", ")}
											{theme.items.length > 2 && ` +${theme.items.length - 2} more`}
										</div>
									</TableCell>
									<TableCell>
										<Badge variant={theme.isActive ? "default" : "secondary"}>
											{theme.isActive ? "Active" : "Inactive"}
										</Badge>
									</TableCell>
									<TableCell>{theme.createdAt}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>
													<Edit className="mr-2 h-4 w-4" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleToggleStatus(theme.id)}>
													<Eye className="mr-2 h-4 w-4" />
													{theme.isActive ? "Deactivate" : "Activate"}
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleDeleteTheme(theme.id)} className="text-red-600">
													<Trash2 className="mr-2 h-4 w-4" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
