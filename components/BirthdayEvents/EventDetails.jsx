import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Gift, Calendar, Star, Eye, Palette, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

function EventDetails() {

	const [ searchTerm, setSearchTerm ] = useState("")
	const [ selectedEvent, setSelectedEvent ] = useState(null)
	const [ eventDialogOpen, setEventDialogOpen ] = useState(false)

	const birthdayEvents = [
		{
			id: 1,
			title: "Princess Birthday Party",
			theme: "Princess",
			ageGroup: "3-8 years",
			duration: "3 hours",
			price: 299,
			bookings: 45,
			rating: 4.8,
			status: "active",
			createdDate: "2024-01-15",
		},
		{
			id: 2,
			title: "Superhero Adventure",
			theme: "Superhero",
			ageGroup: "5-12 years",
			duration: "2.5 hours",
			price: 349,
			bookings: 32,
			rating: 4.9,
			status: "active",
			createdDate: "2024-01-20",
		},
		{
			id: 3,
			title: "Unicorn Magic Party",
			theme: "Unicorn",
			ageGroup: "4-10 years",
			duration: "3 hours",
			price: 329,
			bookings: 28,
			rating: 4.7,
			status: "inactive",
			createdDate: "2024-02-01",
		},
	]

	const filteredEvents = birthdayEvents.filter((event) =>
		event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		event.theme.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleViewEvent = (event) => {
		setSelectedEvent(event)
		setEventDialogOpen(true)
	}

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Birthday Events</CardTitle>
					<CardDescription>Manage your birthday party events</CardDescription>
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
								<TableHead>Theme</TableHead>
								<TableHead>Age Group</TableHead>
								<TableHead>Duration</TableHead>
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
									<TableCell className="font-medium">{event.title}</TableCell>
									<TableCell>
										<Badge variant="outline" className="text-pink-600 border-pink-600">
											{event.theme}
										</Badge>
									</TableCell>
									<TableCell>{event.ageGroup}</TableCell>
									<TableCell>{event.duration}</TableCell>
									<TableCell>${event.price}</TableCell>
									<TableCell>{event.bookings}</TableCell>
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
		</>
	)
}

export default EventDetails