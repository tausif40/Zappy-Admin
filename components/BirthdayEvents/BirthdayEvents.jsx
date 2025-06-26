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
import { Search, Plus, Edit, Trash2, MoreHorizontal, Gift, Calendar, Star, Eye, Palette, Sparkles } from "lucide-react"
import AddThemes from "./AddThemes"
import EventDetails from "./EventDetails"

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

export default function BirthdayEvents() {
	const router = useRouter()
	const [ searchTerm, setSearchTerm ] = useState("")
	const [ selectedEvent, setSelectedEvent ] = useState(null)
	const [ eventDialogOpen, setEventDialogOpen ] = useState(true)

	const handleCreateBirthdayEvent = () => {
		router.push("/birthday-events/create")
	}

	const handleCreateCuratedEvent = () => {
		router.push("/curated-events/create")
	}


	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Birthday Events</h1>
					<p className="text-gray-600 dark:text-gray-400">Manage birthday party events and themes</p>
				</div>
				<div className="flex space-x-3">
					<Button onClick={handleCreateBirthdayEvent} className="bg-pink-600 hover:bg-pink-700">
						<Gift className="mr-2 h-4 w-4" />
						Create Birthday Event
					</Button>
					<Button onClick={handleCreateCuratedEvent} variant="outline">
						<Sparkles className="mr-2 h-4 w-4" />
						Create Curated Event
					</Button>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Events</CardTitle>
						<Gift className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{birthdayEvents.length}</div>
						<p className="text-xs text-muted-foreground">+3 from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{birthdayEvents.reduce((sum, e) => sum + e.bookings, 0)}</div>
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
							{(birthdayEvents.reduce((sum, e) => sum + e.rating, 0) / birthdayEvents.length).toFixed(1)}
						</div>
						<p className="text-xs text-muted-foreground">Out of 5.0</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Events</CardTitle>
						<Eye className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{birthdayEvents.filter((e) => e.status === "active").length}</div>
						<p className="text-xs text-muted-foreground">Currently available</p>
					</CardContent>
				</Card>
			</div>

			{/* Tabs */}
			<Tabs defaultValue="events" className="space-y-6 ">
				<TabsList className="bg-pink-100">
					<TabsTrigger value="events">Events</TabsTrigger>
					<TabsTrigger value="themes">Themes</TabsTrigger>
				</TabsList>

				<TabsContent value="events" className="space-y-6">
					<EventDetails />
				</TabsContent>

				<TabsContent value="themes" className="space-y-6">
					<AddThemes />
				</TabsContent>
			</Tabs>

			{/* Event Details Dialog */}
			{/* <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>{selectedEvent?.title}</DialogTitle>
						<DialogDescription>Event details and information</DialogDescription>
					</DialogHeader>
					{selectedEvent && (
						<div className="space-y-6">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold text-sm text-gray-600 mb-1">Theme</h4>
									<Badge variant="outline" className="text-pink-600 border-pink-600">
										{selectedEvent.theme}
									</Badge>
								</div>
								<div>
									<h4 className="font-semibold text-sm text-gray-600 mb-1">Age Group</h4>
									<p>{selectedEvent.ageGroup}</p>
								</div>
								<div>
									<h4 className="font-semibold text-sm text-gray-600 mb-1">Duration</h4>
									<p>{selectedEvent.duration}</p>
								</div>
								<div>
									<h4 className="font-semibold text-sm text-gray-600 mb-1">Price</h4>
									<p className="text-lg font-bold text-green-600">${selectedEvent.price}</p>
								</div>
							</div>

							<div>
								<h4 className="font-semibold text-sm text-gray-600 mb-2">Description</h4>
								<p className="text-gray-700">
									A magical birthday experience featuring the {selectedEvent.theme.toLowerCase()} theme with
									professional entertainment, decorations, and activities designed for children aged{" "}
									{selectedEvent.ageGroup}.
								</p>
							</div>

							<div>
								<h4 className="font-semibold text-sm text-gray-600 mb-2">Highlights</h4>
								<ul className="list-disc list-inside space-y-1 text-gray-700">
									<li>Professional {selectedEvent.theme.toLowerCase()} character entertainment</li>
									<li>Themed decorations and setup</li>
									<li>Interactive games and activities</li>
									<li>Photo opportunities with props</li>
								</ul>
							</div>

							<div>
								<h4 className="font-semibold text-sm text-gray-600 mb-2">Includes</h4>
								<ul className="list-disc list-inside space-y-1 text-gray-700">
									<li>1 professional entertainer</li>
									<li>Complete themed decoration package</li>
									<li>Sound system and microphone</li>
									<li>Activity supplies and props</li>
									<li>Setup and cleanup service</li>
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
			</Dialog> */}
		</div>
	)
}
