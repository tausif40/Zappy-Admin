import React from "react"
import AdminLayoutPage from "@/components/Layout/AdminLayoutPage"

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminLayoutPage>{children}</AdminLayoutPage>
    </div>
  )
}
