import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AddonsLoading() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<Skeleton className="h-8 w-64" />
					<Skeleton className="h-4 w-48 mt-2" />
				</div>
				<Skeleton className="h-10 w-32" />
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={i}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-4" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-16" />
						</CardContent>
					</Card>
				))}
			</div>

			{/* Table */}
			<Card>
				<CardHeader>
					<Skeleton className="h-10 w-full" />
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="flex items-center space-x-4">
								<Skeleton className="h-4 flex-1" />
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-4 w-12" />
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-8 w-8" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
