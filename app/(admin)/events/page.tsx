"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Filter,
  MapPin,
  Clock,
  Users,
} from "lucide-react"

const events = [
  {
    id: 1,
    title: "Summer Music Festival",
    category: "Music",
    vendor: "Party Planners Co.",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park, NY",
    status: "approved",
    attendees: 500,
    price: "$45",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    title: "Corporate Team Building",
    category: "Corporate",
    vendor: "Dream Events",
    date: "2024-06-20",
    time: "09:00",
    location: "Convention Center, LA",
    status: "pending",
    attendees: 150,
    price: "$120",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    title: "Kids Birthday Party",
    category: "Kids",
    vendor: "Magic Moments",
    date: "2024-06-25",
    time: "14:00",
    location: "Community Hall, Miami",
    status: "approved",
    attendees: 30,
    price: "$25",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    title: "Wedding Reception",
    category: "Wedding",
    vendor: "Elite Celebrations",
    date: "2024-08-10",
    time: "17:00",
    location: "Grand Hotel, Chicago",
    status: "rejected",
    attendees: 200,
    price: "$200",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function EventsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | "delete">("approve")
  const [actionReason, setActionReason] = useState("")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleEventAction = () => {
    console.log(`${actionType} event:`, selectedEvent, "Reason:", actionReason)
    setActionDialogOpen(false)
    setActionReason("")
    setSelectedEvent(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Event Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor all platform events</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">-8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>A list of all events in your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
                <SelectItem value="Kids">Kids</SelectItem>
                <SelectItem value="Wedding">Wedding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{event.vendor}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-3 w-3" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-2 h-3 w-3" />
                        {event.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-3 w-3" />
                      {event.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.status === "approved"
                          ? "default"
                          : event.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {event.attendees}
                    </div>
                  </TableCell>
                  <TableCell>{event.price}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Event
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {event.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => {
                                setSelectedEvent(event)
                                setActionType("approve")
                                setActionDialogOpen(true)
                              }}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Event
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedEvent(event)
                                setActionType("reject")
                                setActionDialogOpen(true)
                              }}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Event
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedEvent(event)
                            setActionType("delete")
                            setActionDialogOpen(true)
                          }}
                        >
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

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve Event" : actionType === "reject" ? "Reject Event" : "Delete Event"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? `Approve "${selectedEvent?.title}" for publication on the platform.`
                : actionType === "reject"
                  ? `Reject "${selectedEvent?.title}" and provide a reason for the vendor.`
                  : `Permanently delete "${selectedEvent?.title}" from the platform.`}
            </DialogDescription>
          </DialogHeader>
          {(actionType === "reject" || actionType === "delete") && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">
                  {actionType === "reject" ? "Reason for rejection" : "Reason for deletion"}
                </Label>
                <Textarea
                  id="reason"
                  placeholder={`Enter the reason for ${actionType}ing this event...`}
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant={actionType === "approve" ? "default" : "destructive"} onClick={handleEventAction}>
              {actionType === "approve" ? "Approve" : actionType === "reject" ? "Reject" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
