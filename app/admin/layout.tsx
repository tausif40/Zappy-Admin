import type React from "react"
import { SideNavbar } from "@/components/Navbar/SideNavbar"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isCollapsed = false

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SideNavbar />

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          "md:pl-64",
          isCollapsed && "md:pl-20",
        )}
      >
        <div className="pt-16 md:pt-0">
          {" "}
          {/* Mobile top padding */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
