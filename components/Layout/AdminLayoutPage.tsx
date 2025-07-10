"use client"

import { useState } from "react"
import { SideNavbar } from "@/components/Navbar/SideNavbar"
import { cn } from "@/lib/utils"

export default function AdminLayoutPage({ children }: { children: React.ReactNode }) {
	const [isCollapsed, setIsCollapsed] = useState(false)

	return (
		<>
			<SideNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
			<div className={cn("transition-all duration-300", "md:pl-64", isCollapsed && "md:pl-20")}>
				<div className="pt-16 md:pt-0">
					{" "}
					{/* Mobile top padding */}
					<main className="p-6">{children}</main>
				</div>
			</div>
		</>
	)
}
