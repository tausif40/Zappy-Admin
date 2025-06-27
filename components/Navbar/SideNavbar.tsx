"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "@/components/Providers/theme-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	LayoutDashboard,
	Users,
	Store,
	Calendar,
	Gift,
	Sparkles,
	Tags,
	Star,
	CheckCircle,
	Settings,
	CreditCard,
	DollarSign,
	Menu,
	Bell,
	User,
	LogOut,
	ChevronLeft,
	ChevronRight,
	Moon,
	Sun,
	Monitor,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"

const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Users", href: "/users", icon: Users },
	{ name: "Vendors", href: "/vendors", icon: Store },
	{ name: "Events", href: "/events", icon: Calendar },
	{ name: "Birthday Events", href: "/birthday-events", icon: Gift },
	{ name: "Curated Events", href: "/curated-events", icon: Sparkles },
	{ name: "Categories", href: "/categories", icon: Tags },
	{ name: "Testimonials", href: "/testimonials", icon: Star },
	{ name: "Verification", href: "/verification", icon: CheckCircle, badge: "3" },
	{ name: "Settings", href: "/settings", icon: Settings },
	{ name: "Payments", href: "/payments", icon: CreditCard },
	{ name: "Earnings", href: "/earnings", icon: DollarSign },
]

interface AdminNavbarProps {
	isCollapsed: boolean
	setIsCollapsed: (collapsed: boolean) => void
}

export function SideNavbar({ isCollapsed, setIsCollapsed }: AdminNavbarProps) {
	const pathname = usePathname()
	const router = useRouter()
	const { theme, setTheme } = useTheme()

	const handleLogout = () => {
		localStorage.removeItem("adminAuth")
		router.push("/login")
	}

	return (
		<>
			{/* Desktop Sidebar */}
			<div
				className={cn(
					"relative hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
					isCollapsed ? "md:w-20" : "md:w-64",
				)}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
					{!isCollapsed && (
						<Link href="/dashboard" className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">Z</span>
							</div>
							<span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Zappy Admin
							</span>
						</Link>
					)}
					<Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="p-2">
						{isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
					</Button>
				</div>

				{/* Navigation */}
				<ScrollArea className="h-screen pb-14">
					<nav className="flex-1 p-4 space-y-2">
						{navigation.map((item) => {
							const isActive = pathname.startsWith(item.href)
							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
										isActive ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
											: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
									)}
								>
									<item.icon className="h-5 w-5 flex-shrink-0" />
									{!isCollapsed && (
										<>
											<span>{item.name}</span>
											{item.badge && (
												<Badge variant="secondary" className="ml-auto">
													{item.badge}
												</Badge>
											)}
										</>
									)}
								</Link>
							)
						})}
					</nav>
				</ScrollArea>

				{/* User Menu */}
				<div className="absolute bottom-0 right-0 p-2 w-full bg-white border-t border-gray-200 dark:border-gray-700">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center")}>
								<User className="h-5 w-5" />
								{!isCollapsed && <span className="ml-3">Admin User</span>}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>Admin Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								Settings
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Theme</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => setTheme("light")}>
								<Sun className="mr-2 h-4 w-4" />
								Light Mode
								{theme === "light" && <CheckCircle className="ml-auto h-4 w-4 text-green-600" />}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								<Moon className="mr-2 h-4 w-4" />
								Dark Mode
								{theme === "dark" && <CheckCircle className="ml-auto h-4 w-4 text-green-600" />}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("system")}>
								<Monitor className="mr-2 h-4 w-4" />
								System
								{theme === "system" && <CheckCircle className="ml-auto h-4 w-4 text-green-600" />}
							</DropdownMenuItem>
							<DropdownMenuSeparator />

							<div className="flex w-full">

								{/* <Tabs defaultValue="light" className="w-full">
									<TabsList className="w-full">
										<TabsTrigger
											value="light"
											className="w-full"
											onClick={() => setTheme("light")}
										>
											<Sun className="mr-2 h-4 w-4" /> Light
										</TabsTrigger>

										<TabsTrigger
											value="dark"
											className="w-full"
											onClick={() => setTheme("dark")}
										>
											<Moon className="mr-2 h-4 w-4" /> Dark
										</TabsTrigger>
									</TabsList>
								</Tabs> */}
							</div>


							<DropdownMenuItem onClick={handleLogout} className="py-2 bg-red-100 hover:!bg-red-200 dark:bg-red-800/30 dark:hover:!bg-red-800/40 mt-4 cursor-pointer">
								<LogOut className="mr-2 h-4 w-4" />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Mobile Header */}
			<div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
				<div className="flex items-center justify-between">
					<Link href="/dashboard" className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">Z</span>
						</div>
						<span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
							Zappy Admin
						</span>
					</Link>
					<div className="flex items-center space-x-2">
						<Button variant="ghost" size="sm">
							<Bell className="h-5 w-5" />
						</Button>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="sm">
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="w-64">
								<nav className="space-y-2 mt-6">
									{navigation.map((item) => {
										const isActive = pathname === item.href
										return (
											<Link
												key={item.name}
												href={item.href}
												className={cn(
													"flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
													isActive
														? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
														: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
												)}
											>
												<item.icon className="h-5 w-5" />
												<span>{item.name}</span>
												{item.badge && (
													<Badge variant="secondary" className="ml-auto">
														{item.badge}
													</Badge>
												)}
											</Link>
										)
									})}
								</nav>
								<div className="absolute bottom-4 left-4 right-4">
									<Button variant="outline" onClick={handleLogout} className="w-full">
										<LogOut className="mr-2 h-4 w-4" />
										Logout
									</Button>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</>
	)
}
