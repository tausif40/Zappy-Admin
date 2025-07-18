'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent
} from '@/components/ui/tabs';
import { Pencil, Trash2, PlusCircle, UserPlus } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const optionTypes = [
	{ label: 'City', value: 'city' },
	{ label: 'State', value: 'state' },
	{ label: 'Category', value: 'category' },
	{ label: 'Theme', value: 'theme' },
	{ label: 'Addons', value: 'addons' },
	{ label: 'Highlights', value: 'highlights' },
	{ label: 'Includes', value: 'includes' },
	{ label: 'Policies', value: 'policies' }
];

export default function AddOptions() {
	const [ activeTab, setActiveTab ] = useState('city');
	const [ data, setData ] = useState({
		city: [],
		state: [],
		category: [],
		theme: [],
		addons: [],
		highlights: [],
		includes: [],
		policies: []
	});
	const [ input, setInput ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ editIndex, setEditIndex ] = useState(null);

	const items = data[ activeTab ];

	const handleSubmit = () => {
		if (!input.trim()) return;


		const newItem = activeTab === 'policies' ? { heading: input, description } : input;
		const updatedItems = editIndex !== null
			? [ ...items.slice(0, editIndex), newItem, ...items.slice(editIndex + 1) ]
			: [ ...items, newItem ];

		setData({ ...data, [ activeTab ]: updatedItems });

		setInput('');
		setDescription('');
		setEditIndex(null);
	};

	const handleDelete = (index) => {
		const updatedItems = items.filter((_, i) => i !== index);
		setData({ ...data, [ activeTab ]: updatedItems });
	};

	const handleEdit = (value, index) => {
		if (activeTab === 'policies') {
			setInput(value.heading);
			setDescription(value.description);
		} else {
			setInput(value);
		}
		setEditIndex(index);
	};

	return (
		<div className="min-h-screen">

			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Options</h1>
					<p className="text-gray-600 dark:text-gray-400">Manage and monitor all platform data</p>
				</div>
			</div>

			<Card className="mb-6 shadow-md mt-8">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold">Chose onet option</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="grid grid-cols-2 space-x-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 h-full">
							{optionTypes.map(({ label, value }) => (
								<TabsTrigger
									key={value}
									value={value}
									className="capitalize px-4 border border-muted hover:bg-muted-foreground/10"
								>
									{label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</CardContent>
			</Card>

			<Tabs value={activeTab}>
				{optionTypes.map(({ value, label }) => (
					<TabsContent key={value} value={value}>
						<div className="grid lg:grid-cols-2 gap-6">
							{/* Form Section */}
							<Card className={`shadow-md animate-in fade-in slide-in-from-bottom-2 ${value === 'policies' ? 'max-h-72' : 'max-h-48'}`}>
								<CardHeader>
									<CardTitle>
										{editIndex !== null ? `Edit ${label}` : `Add ${label}`}
									</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-col gap-4">
									<Input
										value={input}
										placeholder={`Enter ${label}${value === 'policies' ? ' Heading' : ''}`}
										onChange={(e) => setInput(e.target.value)}
									/>
									{value === 'policies' && (
										<Textarea
											value={description}
											placeholder="Enter Description"
											onChange={(e) => setDescription(e.target.value)}
										/>
									)}
									<Button onClick={handleSubmit} className="w-full">
										<PlusCircle className="w-4 h-4 mr-2" />
										{editIndex !== null ? 'Update' : 'Add'}
									</Button>
								</CardContent>
							</Card>

							{/* List Section */}
							<Card className="shadow-md animate-in fade-in slide-in-from-bottom-2">
								<CardHeader className=''>
									<CardTitle>{label} List</CardTitle>
								</CardHeader>
								<CardContent className="space-y-2 max-h-[485px] overflow-y-auto px-4">
									{items.length === 0 && (
										<p className="text-muted-foreground text-sm">No {label.toLowerCase()} added yet.</p>
									)}
									{items.map((item, index) => (
										<div
											key={index}
											className={`flex justify-between items-center px-4 ${value === 'policies' && 'py-2'} rounded-md bg-muted hover:bg-accent transition-all`}
										>
											<div>
												<span className="capitalize block">
													{/* {value === 'policies' ? item.heading : item} */}
													{typeof item === 'string' ? item : item.heading}
												</span>
												{value === 'policies' && (
													<p className="text-sm text-muted-foreground">
														{/* {item.description} */}
														{typeof item === 'object' && item.description && (
															<p>{item.description}</p>
														)}
													</p>
												)}
											</div>
											<div className="flex gap-2">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleEdit(item, index)}
												>
													<Pencil className="w-4 h-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleDelete(index)}
												>
													<Trash2 className="w-4 h-4 text-destructive" />
												</Button>
											</div>
										</div>
									))}
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div >
	);
}
