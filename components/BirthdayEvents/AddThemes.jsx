import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Gift, Calendar, Star, Eye, Palette, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from '../ui/textarea'
import { ArrowLeft, ArrowRight, CheckCircle, Crown, Heart, Wand2, ChevronRight } from "lucide-react"

function AddThemes() {

	const themes = [
		{ id: 1, name: "Princess", description: "Ice queen theme with blue and silver decorations", icon: <Crown />, events: 12, status: "active" },
		{ id: 2, name: "Superhero", description: "Traditional princess theme with pink and gold decorations", icon: <Sparkles />, events: 8, status: "active" },
		{ id: 3, name: "Unicorn", description: "Magical unicorn theme with rainbow colors", icon: <Heart />, events: 6, status: "active" },
		{ id: 4, name: "Pirate", description: "Elegant royal theme with purple and gold", icon: <Wand2 />, events: 4, status: "inactive" },
		{ id: 5, name: "Fairy Tale", description: "Under the sea theme with aqua and pearl colors", icon: <Crown />, events: 3, status: "active" },
	]

	return (
		<>
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<div>
							<CardTitle>Birthday Themes</CardTitle>
							<CardDescription>Manage birthday party themes</CardDescription>
						</div>
						<div>

							{/* <Button>
								<Plus className="mr-2 h-4 w-4" />
								Add Theme
							</Button> */}
							<Dialog>
								<form>
									<DialogTrigger asChild>
										<Button ><Plus className="mr-2 h-4 w-4" /> Add Theme</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<DialogHeader>
											<DialogTitle className='text-center'>Add Theme</DialogTitle>
										</DialogHeader>
										<div className="grid gap-4 mt-2 space-y-1">
											<div className="grid gap-3">
												<Label htmlFor="name">Theme Name</Label>
												<Input id="name-" name="name" placeholder='Enter name' />
											</div>
											<div className='flex gap-4'>
												<div className="grid gap-3">
													<Label htmlFor="name">Theme Icon</Label>
													<Input id="name-" name="name" placeholder='Icon' />
												</div>
												<div className="grid gap-3">
													<Label htmlFor="image">Add image</Label>
													<Input type='file' id="image" name="name" placeholder='Enter name' />
												</div>
											</div>
											<div className="grid gap-3">
												<Label htmlFor="username-1">Description</Label>
												<Textarea id="username-1" name="description" placeholder='Write description..' />
											</div>

										</div>
										<DialogFooter>
											<DialogClose asChild>
												<Button variant="outline">Cancel</Button>
											</DialogClose>
											<Button type="submit">Save changes</Button>
										</DialogFooter>
									</DialogContent>
								</form>
							</Dialog>



						</div>

					</div>
				</CardHeader>

				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{themes.map((theme) => (
							<Card key={theme.id} className="border-2 hover:shadow-lg transition-shadow">
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<p className='text-primary'>{theme.icon}</p>
											<p>{theme.name}</p>
										</div>
										<Badge variant={theme.status === "active" ? "default" : "secondary"}>{theme.status}</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											{/* <span className="text-gray-600">Description:</span> */}
											<span className="font-medium text-muted-foreground">{theme.description}</span>
										</div>
										<div className="flex gap-2 text-sm">
											<span className="text-emerald-600 font-semibold">Total Events:</span>
											<span className="font-medium text-pink-600">{theme.events}</span>
										</div>
										<div className="flex space-x-2 mt-4">
											<Button size="sm" variant="outline" className="flex-1">
												<Edit className="w-4 h-4 mr-1" />
												Edit
											</Button>
											<Button size="sm" variant="outline" className="flex-1">
												<Palette className="w-4 h-4 mr-1" />
												Customize
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>

			</Card>
		</>
	)
}

export default AddThemes