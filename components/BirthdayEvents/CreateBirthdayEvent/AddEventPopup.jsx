import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Upload, Eye } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

function AddEventPopup({ open, setOpen, filteredOptions = [], onConfirm }) {
	const [ searchTerm, setSearchTerm ] = useState('')
	const [ selectedOptions, setSelectedOptions ] = useState([]);

	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm(selectedOptions)
		}
		setOpen(false)
	}

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<div className="flex items-center justify-between mb-3">
					<p>Includes</p>
					<Button variant="outline"><Plus className="h-4 w-4 mr-1" /> Add</Button>
				</div>

				<DialogContent className="max-w-lg">
					<DialogHeader>
						<DialogTitle>Select Your Skills</DialogTitle>
					</DialogHeader>

					<Input
						placeholder="Search..."
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className="mb-4"
					/>

					<ScrollArea className="h-60">
						<div className="grid grid-cols-2 gap-4">
							{filteredOptions.map(option => (
								<label key={option} className="flex items-center space-x-2 hover:bg-gray-100 rounded-sm px-2">
									<Checkbox
										checked={selectedOptions.includes(option)}
										onCheckedChange={() => toggleOption(option)}
									/>
									<span>{option}</span>
								</label>
							))}
						</div>
					</ScrollArea>

					<Button className="mt-4 w-full" onClick={handleConfirm}>
						Confirm Selection
					</Button>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default AddEventPopup