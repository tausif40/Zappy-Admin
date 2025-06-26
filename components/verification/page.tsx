"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react"

const verificationRequests = [
  {
    id: 1,
    vendorName: "Party Planners Co.",
    email: "contact@partyplanners.com",
    phone: "+1 234 567 8900",
    businessType: "Event Planning",
    location: "New York, NY",
    submittedDate: "2024-05-20",
    documents: ["Business License", "Insurance Certificate", "Tax ID"],
    status: "pending",
    experience: "5+ years",
    description: "Professional event planning company specializing in corporate and private events.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    vendorName: "Dream Weddings",
    email: "info@dreamweddings.com",
    phone: "+1 234 567 8901",
    businessType: "Wedding Planning",
    location: "Los Angeles, CA",
    submittedDate: "2024-05-18",
    documents: ["Business License", "Portfolio", "References"],
    status: "pending",
    experience: "8+ years",
    description: "Luxury wedding planning service with a focus on creating unforgettable experiences.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    vendorName: "Tech Conference Solutions",
    email: "hello@techconference.com",
    phone: "+1 234 567 8902",
    businessType: "Corporate Events",
    location: "San Francisco, CA",
    submittedDate: "2024-05-15",
    documents: ["Business License", "Client Testimonials", "Equipment List"],
    status: "under_review",
    experience: "3+ years",
    description: "Specialized in organizing technology conferences and corporate seminars.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function VendorVerification() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject">("approve")
  const [actionReason, setActionReason] = useState("")

  const filteredRequests = verificationRequests.filter(
    (request) =>
      request.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.businessType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAction = () => {
    console.log(`${actionType} verification:`, selectedRequest, "Reason:", actionReason)
    setActionDialogOpen(false)
    setActionReason("")
    setSelectedRequest(null)
  }

  const openDetailsDialog = (request: any) => {
    setSelectedRequest(request)
    setDetailsDialogOpen(true)
  }

  const openActionDialog = (request: any, type: "approve" | "reject") => {
    setSelectedRequest(request)
    setActionType(type)
    setActionDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vendor Verification</h1>
        <p className="text-gray-600 dark:text-gray-400">Review and approve vendor verification requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {verificationRequests.filter((r) => r.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {verificationRequests.filter((r) => r.status === "under_review").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently reviewing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">New requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Verification Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Requests</CardTitle>
          <CardDescription>Review vendor applications and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search verification requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={request.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {request.vendorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.vendorName}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="mr-1 h-3 w-3" />
                          {request.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.businessType}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-1 h-3 w-3" />
                      {request.location}
                    </div>
                  </TableCell>
                  <TableCell>{request.experience}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "pending"
                          ? "secondary"
                          : request.status === "under_review"
                            ? "default"
                            : "outline"
                      }
                    >
                      {request.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {request.submittedDate}
                    </div>
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
                        <DropdownMenuItem onClick={() => openDetailsDialog(request)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Documents
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-green-600"
                          onClick={() => openActionDialog(request, "approve")}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => openActionDialog(request, "reject")}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
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

      {/* Vendor Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vendor Verification Details</DialogTitle>
            <DialogDescription>Review the complete vendor application and documentation</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Vendor Info */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedRequest.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedRequest.vendorName
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedRequest.vendorName}</h3>
                  <p className="text-gray-600">{selectedRequest.businessType}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="mr-1 h-3 w-3" />
                    {selectedRequest.location}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <div className="flex items-center text-sm mt-1">
                    <Mail className="mr-2 h-3 w-3" />
                    {selectedRequest.email}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <div className="flex items-center text-sm mt-1">
                    <Phone className="mr-2 h-3 w-3" />
                    {selectedRequest.phone}
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div>
                <Label className="text-sm font-medium">Business Description</Label>
                <p className="text-sm text-gray-600 mt-1">{selectedRequest.description}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Experience</Label>
                <p className="text-sm text-gray-600 mt-1">{selectedRequest.experience}</p>
              </div>

              {/* Documents */}
              <div>
                <Label className="text-sm font-medium">Submitted Documents</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedRequest.documents.map((doc: string, index: number) => (
                    <Badge key={index} variant="outline">
                      <FileText className="mr-1 h-3 w-3" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setDetailsDialogOpen(false)
                    openActionDialog(selectedRequest, "approve")
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Vendor
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setDetailsDialogOpen(false)
                    openActionDialog(selectedRequest, "reject")
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Application
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === "approve" ? "Approve Vendor" : "Reject Application"}</DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? `Approve ${selectedRequest?.vendorName} as a verified vendor on the platform.`
                : `Reject ${selectedRequest?.vendorName}'s verification application and provide feedback.`}
            </DialogDescription>
          </DialogHeader>
          {actionType === "reject" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">Reason for rejection</Label>
                <Textarea
                  id="reason"
                  placeholder="Provide detailed feedback for the vendor..."
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
            <Button variant={actionType === "approve" ? "default" : "destructive"} onClick={handleAction}>
              {actionType === "approve" ? "Approve Vendor" : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
