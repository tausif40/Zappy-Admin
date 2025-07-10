"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
	Users,
	Store,
	Calendar,
	DollarSign,
	TrendingUp,
	AlertCircle,
	CheckCircle,
	ArrowUpRight,
	ArrowDownRight,
} from "lucide-react"
import Link from "next/link"

const stats = [
	{
		title: "Total Users",
		value: "12,847",
		change: "+12%",
		trend: "up",
		icon: Users,
		href: "/admin/users",
	},
	{
		title: "Active Vendors",
		value: "1,234",
		change: "+8%",
		trend: "up",
		icon: Store,
		href: "/admin/vendors",
	},
	{
		title: "Total Events",
		value: "5,678",
		change: "+15%",
		trend: "up",
		icon: Calendar,
		href: "/admin/events",
	},
	{
		title: "Monthly Revenue",
		value: "$89,432",
		change: "+23%",
		trend: "up",
		icon: DollarSign,
		href: "/admin/earnings",
	},
]

const recentActivity = [
	{
		id: 1,
		type: "user",
		message: "New user registration: John Doe",
		time: "2 minutes ago",
		status: "success",
	},
	{
		id: 2,
		type: "vendor",
		message: "Vendor verification request: Party Planners Co.",
		time: "15 minutes ago",
		status: "pending",
	},
	{
		id: 3,
		type: "event",
		message: "New event created: Summer Music Festival",
		time: "1 hour ago",
		status: "success",
	},
	{
		id: 4,
		type: "payment",
		message: "Payment processed: $2,450",
		time: "2 hours ago",
		status: "success",
	},
]

const pendingTasks = [
	{
		id: 1,
		title: "Review vendor verifications",
		count: 3,
		priority: "high",
		href: "/admin/verification",
	},
	{
		id: 2,
		title: "Approve new events",
		count: 7,
		priority: "medium",
		href: "/admin/events",
	},
	{
		id: 3,
		title: "Process refund requests",
		count: 2,
		priority: "high",
		href: "/admin/payments",
	},
]

export default function AdminDashboard() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
				<p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with Zappy today.</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat) => (
					<Link key={stat.title} href={stat.href}>
						<Card className="hover:shadow-lg transition-shadow cursor-pointer">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
								<stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stat.value}</div>
								<div className="flex items-center text-xs text-green-600">
									{stat.trend === "up" ? (
										<ArrowUpRight className="h-3 w-3 mr-1" />
									) : (
										<ArrowDownRight className="h-3 w-3 mr-1" />
									)}
									{stat.change} from last month
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Recent Activity */}
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>Latest updates from your platform</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentActivity.map((activity) => (
								<div key={activity.id} className="flex items-center space-x-4">
									<div
										className={`w-2 h-2 rounded-full ${activity.status === "success"
											? "bg-green-500"
											: activity.status === "pending"
												? "bg-yellow-500"
												: "bg-red-500"
											}`}
									/>
									<div className="flex-1">
										<p className="text-sm font-medium">{activity.message}</p>
										<p className="text-xs text-gray-500">{activity.time}</p>
									</div>
									<Badge variant={activity.status === "success" ? "default" : "secondary"}>{activity.status}</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Pending Tasks */}
				<Card>
					<CardHeader>
						<CardTitle>Pending Tasks</CardTitle>
						<CardDescription>Items requiring your attention</CardDescription>
					</CardHeader>
					<CardContent>
						{pendingTasks.map((task) => (
							<Link key={task.id} href={task.href}>
								<div className="mt-2 flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
									<div>
										<p className="text-sm font-medium">{task.title}</p>
										<div className="flex items-center space-x-2 mt-1">
											<Badge variant={task.priority === "high" ? "destructive" : "secondary"}>{task.priority}</Badge>
											<span className="text-xs text-gray-500">{task.count} items</span>
										</div>
									</div>
									<ArrowUpRight className="h-4 w-4 text-gray-400" />
								</div>
							</Link>
						))}
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
					<CardDescription>Common administrative tasks</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<Link href="/admin/events">
							<Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
								<Calendar className="h-6 w-6" />
								<span className="text-sm">Create Event</span>
							</Button>
						</Link>
						<Link href="/admin/categories">
							<Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
								<TrendingUp className="h-6 w-6" />
								<span className="text-sm">Manage Categories</span>
							</Button>
						</Link>
						<Link href="/admin/verification">
							<Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
								<CheckCircle className="h-6 w-6" />
								<span className="text-sm">Verify Vendors</span>
							</Button>
						</Link>
						<Link href="/admin/settings">
							<Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
								<AlertCircle className="h-6 w-6" />
								<span className="text-sm">Site Settings</span>
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
