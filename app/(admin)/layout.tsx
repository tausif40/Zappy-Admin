"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SideNavbar } from "@/components/Navbar/SideNavbar"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (!adminAuth) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // if (!isAuthenticated) {
  //   return (
  //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SideNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

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
