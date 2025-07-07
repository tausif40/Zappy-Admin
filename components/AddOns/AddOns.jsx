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
import { Plus, Search, MoreHorizontal, Edit, Trash2, Package, DollarSign, Users, TrendingUp } from "lucide-react"

const mockAddons = [
	{
		id: 1,
		name: "Professional Photography",
		description: "Professional photographer for 2 hours with edited photos",
		category: "Photography",
		price: 200,
		duration: "2 hours",
		maxQuantity: 1,
		isActive: true,
		isPopular: true,
		bookings: 45,
		createdAt: "2024-01-15",
	},
	{
		id: 2,
		name: "DJ & Sound System",
		description: "Professional DJ with sound system and lighting",
		category: "Entertainment",
		price: 300,
		duration: "4 hours",
		maxQuantity: 1,
		isActive: true,
		isPopular: true,
		bookings: 38,
		createdAt: "2024-01-12",
	},
	{
		id: 3,
		name: "Balloon Decoration",
		description: "Custom balloon arrangements and decorations",
		category: "Decoration",
		price: 75,
		duration: "Setup included",
		maxQuantity: 5,
		isActive: true,
		isPopular: false,
		bookings: 22,
		createdAt: "2024-01-10",
	},
	{
		id: 4,
		name: "Face Painting",
		description: "Professional face painter for kids",
		category: "Entertainment",
		price: 120,
		duration: "2 hours",
		maxQuantity: 2,
		isActive: true,
		isPopular: false,
		bookings: 31,
		createdAt: "2024-01-08",
	},
	{
		id: 5,
		name: "Custom Cake",
		description: "Custom designed cake for special occasions",
		category: "Food",
		price: 150,
		duration: "N/A",
		maxQuantity: 1,
		isActive: false,
		isPopular: false,
		bookings: 12,
		createdAt: "2024-01-05",
	},
]

const categories = [ "Photography", "Entertainment", "Decoration", "Food", "Transportation", "Equipment", "Services" ]

export default function AddOns() {
	const [ addons, setAddons ] = useState(mockAddons)
	const [ searchTerm, setSearchTerm ] = useState("")
	const [ isCreateDialogOpen, setIsCreateDialogOpen ] = useState(false)
	const [ newAddon, setNewAddon ] = useState({
		name: "",
		description: "",
		category: "Photography",
		price: "",
		duration: "",
		maxQuantity: "",
		isActive: true,
		isPopular: false,
	})

	const filteredAddons = addons.filter(
		(addon) =>
			addon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			addon.category.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleCreateAddon = () => {
		const addon = {
			id: addons.length + 1,
			...newAddon,
			price: Number.parseFloat(newAddon.price),
			maxQuantity: Number.parseInt(newAddon.maxQuantity),
			bookings: 0,
			createdAt: new Date().toISOString().split("T")[ 0 ],
		}
		setAddons([ ...addons, addon ])
		setNewAddon({
			name: "",
			description: "",
			category: "Photography",
			price: "",
			duration: "",
			maxQuantity: "",
			isActive: true,
			isPopular: false,
		})
		setIsCreateDialogOpen(false)
	}

	const handleToggleStatus = (id) => {
		setAddons(addons.map((addon) => (addon.id === id ? { ...addon, isActive: !addon.isActive } : addon)))
	}

	const handleDeleteAddon = (id) => {
		setAddons(addons.filter((addon) => addon.id !== id))
	}

	const totalRevenue = addons.reduce((acc, addon) => acc + addon.price * addon.bookings, 0)
	const avgPrice = addons.reduce((acc, addon) => acc + addon.price, 0) / addons.length

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add-ons Management</h1>
					<p className="text-gray-600 dark:text-gray-400">Create and manage event add-ons</p>
				</div>
				<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-pink-600 hover:bg-pink-700">
							<Plus className="h-4 w-4 mr-2" />
							Create Add-on
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>Create New Add-on</DialogTitle>
							<DialogDescription>Add a new add-on that can be selected during event booking</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label htmlFor="name">Add-on Name</Label>
								<Input
									id="name"
									placeholder="e.g., Professional Photography"
									value={newAddon.name}
									onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
								/>
							</div>

							<div>
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									placeholder="Describe the add-on service..."
									value={newAddon.description}
									onChange={(e) => setNewAddon({ ...newAddon, description: e.target.value })}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="category">Category</Label>
									<select
										id="category"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
										value={newAddon.category}
										onChange={(e) => setNewAddon({ ...newAddon, category: e.target.value })}
									>
										{categories.map((category) => (
											<option key={category} value={category}>
												{category}
											</option>
										))}
									</select>
								</div>
								<div>
									<Label htmlFor="price">Price ($)</Label>
									<Input
										id="price"
										type="number"
										placeholder="200"
										value={newAddon.price}
										onChange={(e) => setNewAddon({ ...newAddon, price: e.target.value })}
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="duration">Duration</Label>
									<Input
										id="duration"
										placeholder="e.g., 2 hours"
										value={newAddon.duration}
										onChange={(e) => setNewAddon({ ...newAddon, duration: e.target.value })}
									/>
								</div>
								<div>
									<Label htmlFor="maxQuantity">Max Quantity</Label>
									<Input
										id="maxQuantity"
										type="number"
										placeholder="1"
										value={newAddon.maxQuantity}
										onChange={(e) => setNewAddon({ ...newAddon, maxQuantity: e.target.value })}
									/>
								</div>
							</div>

							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="isActive"
										checked={newAddon.isActive}
										onCheckedChange={(checked) => setNewAddon({ ...newAddon, isActive: checked })}
									/>
									<Label htmlFor="isActive">Active</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										id="isPopular"
										checked={newAddon.isPopular}
										onCheckedChange={(checked) => setNewAddon({ ...newAddon, isPopular: checked })}
									/>
									<Label htmlFor="isPopular">Mark as Popular</Label>
								</div>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={handleCreateAddon} className="bg-purple-600 hover:bg-purple-700">
								Create Add-on
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Add-ons</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{addons.length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Add-ons</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{addons.filter((a) => a.isActive).length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{addons.reduce((acc, a) => acc + a.bookings, 0)}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
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
								placeholder="Search add-ons..."
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
								<TableHead>Add-on</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Duration</TableHead>
								<TableHead>Max Qty</TableHead>
								<TableHead>Bookings</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredAddons.map((addon) => (
								<TableRow key={addon.id}>
									<TableCell>
										<div>
											<div className="font-medium flex items-center space-x-2">
												<span>{addon.name}</span>
												{addon.isPopular && (
													<Badge variant="outline" className="text-yellow-600 border-yellow-600">
														Popular
													</Badge>
												)}
											</div>
											<div className="text-sm text-gray-500">{addon.description}</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant="outline">{addon.category}</Badge>
									</TableCell>
									<TableCell>${addon.price}</TableCell>
									<TableCell>{addon.duration}</TableCell>
									<TableCell>{addon.maxQuantity}</TableCell>
									<TableCell>
										<div className="flex items-center space-x-2">
											<span>{addon.bookings}</span>
											<span className="text-sm text-gray-500">
												(${(addon.price * addon.bookings).toLocaleString()})
											</span>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant={addon.isActive ? "default" : "secondary"}>
											{addon.isActive ? "Active" : "Inactive"}
										</Badge>
									</TableCell>
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
												<DropdownMenuItem onClick={() => handleToggleStatus(addon.id)}>
													<Package className="mr-2 h-4 w-4" />
													{addon.isActive ? "Deactivate" : "Activate"}
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleDeleteAddon(addon.id)} className="text-red-600">
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
