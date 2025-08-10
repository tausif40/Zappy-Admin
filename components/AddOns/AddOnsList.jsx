import React from 'react'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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

function AddOnsList() {

	const [ addons, setAddons ] = useState(mockAddons)
	const [ searchTerm, setSearchTerm ] = useState("")

	const filteredAddons = addons.filter(
		(addon) =>
			addon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			addon.category.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleToggleStatus = (id) => {
		setAddons(addons.map((addon) => (addon.id === id ? { ...addon, isActive: !addon.isActive } : addon)))
	}

	const handleDeleteAddon = (id) => {
		setAddons(addons.filter((addon) => addon.id !== id))
	}

	const totalRevenue = addons.reduce((acc, addon) => acc + addon.price * addon.bookings, 0)
	const avgPrice = addons.reduce((acc, addon) => acc + addon.price, 0) / addons.length
	return (
		<>
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
		</>
	)
}

export default AddOnsList