"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Plus, Package, DollarSign, Users, TrendingUp, LoaderCircle, Upload, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { addCategory, createAddon, getCategory } from "@/store/features/addOns-slice"
import AddOnsList from "./AddOnsList"
import { useToast } from "@/hooks/use-toast"

export default function AddOns() {
	const dispatch = useDispatch()
	const { toast } = useToast();
	const [ categoryName, setCategoryName ] = useState("")
	const [ isLoading, setIsLoading ] = useState(false)
	const [ isCreateDialogOpen, setIsCreateDialogOpen ] = useState(false)
	const [ isCategoryDialogOpen, setIsCategoryDialogOpen ] = useState(false)
	const [ newAddon, setNewAddon ] = useState({
		name: "",
		description: "",
		category: "",
		price: "",
		duration: "",
		maxQuantity: "",
		isActive: true,
		popular: false,
		image: null
	})
	const [ imagePreview, setImagePreview ] = useState(null)

	const category = useSelector((state) => state.addOnsSlice.category);
	console.log(category);
	useEffect(() => {
		dispatch(getCategory());
	}, [ dispatch ]);

	useEffect(() => {
		if (category?.data && category?.data?.length > 0 && !newAddon.category) {
			setNewAddon(prev => ({ ...prev, category: category?.data[ 0 ].name }));
		}
	}, [ category, newAddon ]);

	const handleImageChange = (e) => {
		const file = e.target.files[ 0 ];
		if (file) {
			setNewAddon({ ...newAddon, image: file });
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => {
		setNewAddon({ ...newAddon, image: null });
		setImagePreview(null);
	};

	const handleCreateAddon = async () => {
		try {
			setIsLoading(true);

			// Create FormData for image upload
			const formData = new FormData();
			formData.append('name', newAddon.name);
			formData.append('description', newAddon.description);
			formData.append('category', newAddon.category);
			formData.append('price', newAddon.price);
			formData.append('duration', newAddon.duration);
			formData.append('maxQuantity', newAddon.maxQuantity);
			// formData.append('isActive', newAddon.isActive);
			formData.append('popular', newAddon.popular);
			if (newAddon.image) {
				formData.append('banner', newAddon.image);
			}

			for (const [ key, value ] of formData.entries()) {
				console.log(`${key}: ${value}`);
			}

			const res = await dispatch(createAddon(formData)).unwrap();
			console.log("Addon created successfully:", res);

			if (res.status === 201) {
				toast({
					variant: "success",
					title: "Add-on Created Successfully!"
				});

				// Reset form
				setNewAddon({
					name: "",
					description: "",
					category: category?.data && category?.data?.length > 0 ? category?.data[ 0 ].name : "",
					price: "",
					duration: "",
					maxQuantity: "",
					isActive: true,
					popular: false,
					image: null
				});
				setImagePreview(null);
				setIsCreateDialogOpen(false);
			}
		} catch (error) {
			console.log("Error creating addon:", error);
			toast({
				variant: "destructive",
				title: error?.message || "Failed to create add-on"
			});
		} finally {
			setIsLoading(false);
		}
	}

	const handleCreateAddonCategory = async () => {
		try {
			setIsLoading(true);
			const res = await dispatch(addCategory({ name: categoryName })).unwrap();
			console.log(res);
			if (res.status === 201) {
				setIsCategoryDialogOpen(false)
				toast({ variant: "success", title: "Category Add Successful!" });
				// Refresh categories after adding new one
				dispatch(getCategory());
				setCategoryName("");
			}
		} catch (error) {
			console.log(error);
			toast({ variant: "destructive", title: error?.message });
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add-ons Management</h1>
					<p className="text-gray-600 dark:text-gray-400">Create and manage event add-ons</p>
				</div>

				<div className="flex gap-4">
					<Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
						<DialogTrigger asChild>
							<Button variant='outline'>
								<Plus className="h-4 w-4 mr-2" />
								Add Category
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-2xl">
							<DialogHeader>
								<DialogTitle>Create New Category</DialogTitle>
								<DialogDescription>Add a new Category that can be selected Add-ons creation</DialogDescription>
							</DialogHeader>
							<div className="space-y-2">
								<Label htmlFor="categoryName">Category Name</Label>
								<Input
									id="categoryName"
									placeholder="e.g. Photography, Catering"
									value={categoryName}
									onChange={(e) => setCategoryName(e.target.value)}
								/>
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
									Cancel
								</Button>
								<Button onClick={handleCreateAddonCategory} className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
									Create Category
									{isLoading && <LoaderCircle className='animate-spin h-4 w-4 ml-2' />}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
						<DialogTrigger asChild>
							<Button className="bg-pink-600 hover:bg-pink-700">
								<Plus className="h-4 w-4 mr-2" />
								Create Add-on
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-2xl">
							<DialogHeader>
								<DialogTitle>Create New Add-on</DialogTitle>
								<DialogDescription>Add a new add-on that can be selected during event booking</DialogDescription>
							</DialogHeader>
							<div className="space-y-4">
								<div>
									<Label htmlFor="name">Add-on Name</Label>
									<Input
										id="name"
										placeholder="e.g., Professional Photography"
										value={newAddon.name}
										onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
									/>
								</div>

								<div>
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										placeholder="Describe the add-on service..."
										value={newAddon.description}
										onChange={(e) => setNewAddon({ ...newAddon, description: e.target.value })}
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor="category">Category</Label>
										<select
											id="category"
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
											value={newAddon.category}
											onChange={(e) => setNewAddon({ ...newAddon, category: e.target.value })}
											disabled={category?.isLoading}
										>
											{category?.isLoading ? (
												<option>Loading categories...</option>
											) : category?.data && category?.data?.length > 0 ? (
												category?.data?.map((cat) => (
													<option key={cat.id} value={cat.name}>
														{cat.name}
													</option>
												))
											) : (
												<option>No categories available</option>
											)}
										</select>
									</div>
									<div>
										<Label htmlFor="price">Price (₹)</Label>
										<Input
											id="price"
											type="number"
											placeholder="200"
											value={newAddon.price}
											onChange={(e) => setNewAddon({ ...newAddon, price: e.target.value })}
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor="duration">Duration</Label>
										<Input
											id="duration"
											placeholder="e.g., 2 hours"
											value={newAddon.duration}
											onChange={(e) => setNewAddon({ ...newAddon, duration: e.target.value })}
										/>
									</div>
									<div>
										<Label htmlFor="maxQuantity">Max Quantity</Label>
										<Input
											id="maxQuantity"
											type="number"
											placeholder="1"
											value={newAddon.maxQuantity}
											onChange={(e) => setNewAddon({ ...newAddon, maxQuantity: e.target.value })}
										/>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									{/* <div className="flex items-center space-x-2">
										<Switch
											id="isActive"
											checked={newAddon.isActive}
											onCheckedChange={(checked) => setNewAddon({ ...newAddon, isActive: checked })}
										/>
										<Label htmlFor="isActive">Active</Label>
									</div> */}
									<div className="flex items-center space-x-2">
										<Switch
											id="popular"
											checked={newAddon.popular}
											onCheckedChange={(checked) => setNewAddon({ ...newAddon, popular: checked })}
										/>
										<Label htmlFor="popular">Mark as Popular</Label>
									</div>
								</div>

								{/* Image Upload */}
								<div>
									<Label htmlFor="image">Add-on Image</Label>
									<div className="mt-2">
										{!imagePreview ? (
											<div className="flex justify-center px-4 pt-5 pb-4 border-2 border-gray-300 border-dashed rounded-md">
												<div className="space-y-1 text-center">
													<Upload className="mx-auto h-8 w-8 text-gray-400" />
													<div className="flex text-sm text-gray-600">
														<label
															htmlFor="image-upload"
															className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
														>
															<span>Upload an image</span>
															<input
																id="image-upload"
																name="image-upload"
																type="file"
																className="sr-only"
																accept="image/*"
																onChange={handleImageChange}
															/>
														</label>
														<p className="pl-1">or drag and drop</p>
													</div>
													<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
												</div>
											</div>
										) : (
											<div className="relative">
												<img
													src={imagePreview}
													alt="Preview"
													className="w-full h-32 object-cover rounded-md"
												/>
												<Button
													type="button"
													variant="destructive"
													size="sm"
													className="absolute top-2 right-2"
													onClick={removeImage}
												>
													<X className="h-4 w-4" />
												</Button>
											</div>
										)}
									</div>
								</div>

							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
									Cancel
								</Button>
								<Button onClick={handleCreateAddon} className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
									{isLoading ? (
										<>
											<LoaderCircle className='animate-spin h-4 w-4 mr-2' />
											Creating...
										</>
									) : (
										'Create Add-on'
									)}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Add-ons</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">20</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Add-ons</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">16</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">50</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">₹ 1456</div>
					</CardContent>
				</Card>
			</div>

			{/* Search and Filters */}
			<AddOnsList />
		</div>
	)
}
