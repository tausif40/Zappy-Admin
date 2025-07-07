"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Sparkles, Calendar, Star, Eye, MapPin, Clock } from "lucide-react"

const curatedEvents = [
	{
		id: 1,
		title: "Jazz Night Under the Stars",
		category: "Music",
		location: "Downtown Amphitheater",
		date: "2024-03-15",
		time: "7:00 PM",
		price: 85,
		capacity: 200,
		bookings: 156,
		rating: 4.9,
		status: "active",
		featured: true,
		createdDate: "2024-01-15",
	},
	{
		id: 2,
		title: "Artisan Food Festival",
		category: "Food",
		location: "Central Park",
		date: "2024-03-22",
		time: "11:00 AM",
		price: 45,
		capacity: 500,
		bookings: 387,
		rating: 4.7,
		status: "active",
		featured: false,
		createdDate: "2024-01-20",
	},
	{
		id: 3,
		title: "Tech Innovation Summit",
		category: "Technology",
		location: "Convention Center",
		date: "2024-04-05",
		time: "9:00 AM",
		price: 150,
		capacity: 300,
		bookings: 245,
		rating: 4.8,
		status: "active",
		featured: true,
		createdDate: "2024-02-01",
	},
]

const categories = [
	{ id: 1, name: "Music", color: "#8B5CF6", events: 8, status: "active" },
	{ id: 2, name: "Arts", color: "#EC4899", events: 6, status: "active" },
	{ id: 3, name: "Food", color: "#F59E0B", events: 12, status: "active" },
	{ id: 4, name: "Sports", color: "#10B981", events: 4, status: "active" },
	{ id: 5, name: "Technology", color: "#3B82F6", events: 7, status: "active" },
]

export default function CuratedEvent() {
	const router = useRouter()
	const [ searchTerm, setSearchTerm ] = useState("")
	const [ selectedEvent, setSelectedEvent ] = useState(null)
	const [ eventDialogOpen, setEventDialogOpen ] = useState(false)

	const filteredEvents = curatedEvents.filter(
		(event) =>
			event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.category.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleCreateCuratedEvent = () => {
		router.push("/curated-events/create")
	}

	const handleViewEvent = (event) => {
		setSelectedEvent(event)
		setEventDialogOpen(true)
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Curated Events</h1>
					<p className="text-gray-600 dark:text-gray-400">Manage premium curated events and experiences</p>
				</div>
				<Button onClick={handleCreateCuratedEvent} className="bg-pink-600 hover:bg-pink-700">
					<Sparkles className="mr-2 h-4 w-4" />
					Create Curated Event
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Events</CardTitle>
						<Sparkles className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{curatedEvents.length}</div>
						<p className="text-xs text-muted-foreground">+2 from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{curatedEvents.reduce((sum, e) => sum + e.bookings, 0)}</div>
						<p className="text-xs text-muted-foreground">This month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Average Rating</CardTitle>
						<Star className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{(curatedEvents.reduce((sum, e) => sum + e.rating, 0) / curatedEvents.length).toFixed(1)}
						</div>
						<p className="text-xs text-muted-foreground">Out of 5.0</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Featured Events</CardTitle>
						<Eye className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{curatedEvents.filter((e) => e.featured).length}</div>
						<p className="text-xs text-muted-foreground">Currently featured</p>
					</CardContent>
				</Card>
			</div>

			{/* Tabs */}
			<Tabs defaultValue="events" className="space-y-6">
				<TabsList>
					<TabsTrigger value="events">Events</TabsTrigger>
					<TabsTrigger value="categories">Categories</TabsTrigger>
				</TabsList>

				{/* Events Tab */}
				<TabsContent value="events" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Curated Events</CardTitle>
							<CardDescription>Manage your premium curated events</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex items-center space-x-4 mb-6">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										placeholder="Search events..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10"
									/>
								</div>
							</div>

							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Event</TableHead>
										<TableHead>Category</TableHead>
										<TableHead>Date & Time</TableHead>
										<TableHead>Location</TableHead>
										<TableHead>Price</TableHead>
										<TableHead>Bookings</TableHead>
										<TableHead>Rating</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredEvents.map((event) => (
										<TableRow key={event.id}>
											<TableCell className="font-medium">
												<div className="flex items-center space-x-2">
													{event.featured && <Star className="w-4 h-4 text-yellow-500" />}
													<span>{event.title}</span>
												</div>
											</TableCell>
											<TableCell>
												<Badge variant="outline" className="text-purple-600 border-purple-600">
													{event.category}
												</Badge>
											</TableCell>
											<TableCell>
												<div className="text-sm">
													<div className="flex items-center">
														<Calendar className="w-3 h-3 mr-1" />
														{event.date}
													</div>
													<div className="flex items-center text-gray-500">
														<Clock className="w-3 h-3 mr-1" />
														{event.time}
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center text-sm">
													<MapPin className="w-3 h-3 mr-1" />
													{event.location}
												</div>
											</TableCell>
											<TableCell>${event.price}</TableCell>
											<TableCell>
												<div className="text-sm">
													{event.bookings}/{event.capacity}
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center">
													<Star className="w-4 h-4 text-yellow-400 mr-1" />
													{event.rating}
												</div>
											</TableCell>
											<TableCell>
												<Badge variant={event.status === "active" ? "default" : "secondary"}>{event.status}</Badge>
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" className="h-8 w-8 p-0">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem onClick={() => handleViewEvent(event)}>
															<Eye className="mr-2 h-4 w-4" />
															View Details
														</DropdownMenuItem>
														<DropdownMenuItem>
															<Edit className="mr-2 h-4 w-4" />
															Edit Event
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem className="text-red-600">
															<Trash2 className="mr-2 h-4 w-4" />
															Delete Event
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
				</TabsContent>

				{/* Categories Tab */}
				<TabsContent value="categories" className="space-y-6">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<div>
									<CardTitle>Event Categories</CardTitle>
									<CardDescription>Manage curated event categories</CardDescription>
								</div>
								<Button>
									<Plus className="mr-2 h-4 w-4" />
									Add Category
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{categories.map((category) => (
									<Card key={category.id} className="border-2 hover:shadow-lg transition-shadow">
										<CardHeader className="pb-3">
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-3">
													<div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }} />
													<CardTitle className="text-lg">{category.name}</CardTitle>
												</div>
												<Badge variant={category.status === "active" ? "default" : "secondary"}>
													{category.status}
												</Badge>
											</div>
										</CardHeader>
										<CardContent>
											<div className="space-y-2">
												<div className="flex justify-between text-sm">
													<span className="text-gray-600">Events:</span>
													<span className="font-medium">{category.events}</span>
												</div>
												<div className="flex space-x-2 mt-4">
													<Button size="sm" variant="outline" className="flex-1">
														<Edit className="w-4 h-4 mr-1" />
														Edit
													</Button>
													<Button size="sm" variant="outline" className="flex-1">
														<Eye className="w-4 h-4 mr-1" />
														View
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Event Details Dialog */}
			<Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle className="flex items-center space-x-2">
							{selectedEvent?.featured && <Star className="w-5 h-5 text-yellow-500" />}
							<span>{selectedEvent?.title}</span>
						</DialogTitle>
						<DialogDescription>Curated event details and information</DialogDescription>
					</DialogHeader>
					{selectedEvent && (
						<div className="space-y-6">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold text-sm text-gray-600 mb-1">Category</h4>
									<Badge variant="outline" className="text-purple-600 border-purple-600">
										{selectedEvent.category}
									</Badge>
								</div>
								<div>
									<h4 className="font-semibold text-sm text-gray-600 mb-1">Date & Time</h4>
									<p>
										{selectedEvent.date} at {selectedEvent.time}
									</p>
								</div>
								<div>
									<h4 className="font-semibold text-sm text-gray-600 mb-1">Location</h4>
									<p>{selectedEvent.location}</p>
								</div>
								<div>
									<h4 className="font-semibold text-sm text-gray-600 mb-1">Price</h4>
									<p className="text-lg font-bold text-green-600">${selectedEvent.price}</p>
								</div>
							</div>

							<div>
								<h4 className="font-semibold text-sm text-gray-600 mb-2">Description</h4>
								<p className="text-gray-700">
									An exclusive {selectedEvent.category.toLowerCase()} experience featuring premium entertainment,
									professional setup, and curated activities designed to create unforgettable memories.
								</p>
							</div>

							<div>
								<h4 className="font-semibold text-sm text-gray-600 mb-2">Event Highlights</h4>
								<ul className="list-disc list-inside space-y-1 text-gray-700">
									<li>Premium {selectedEvent.category.toLowerCase()} experience</li>
									<li>Professional event coordination</li>
									<li>Exclusive venue access</li>
									<li>Complimentary refreshments</li>
								</ul>
							</div>

							<div>
								<h4 className="font-semibold text-sm text-gray-600 mb-2">Includes</h4>
								<ul className="list-disc list-inside space-y-1 text-gray-700">
									<li>Event admission for specified capacity</li>
									<li>Professional event management</li>
									<li>Premium venue setup</li>
									<li>Welcome reception</li>
									<li>Event photography</li>
								</ul>
							</div>

							<div className="flex justify-end space-x-3">
								<Button variant="outline" onClick={() => setEventDialogOpen(false)}>
									Close
								</Button>
								<Button>
									<Edit className="w-4 h-4 mr-2" />
									Edit Event
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
