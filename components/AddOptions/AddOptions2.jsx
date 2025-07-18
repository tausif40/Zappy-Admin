'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Import all form components
import CityForm from '@/components/options/AddCity';
import StateForm from '@/components/options/StateForm';
import CategoryForm from '@/components/options/CategoryForm';
import ThemeForm from '@/components/options/ThemeForm';
import AddonsForm from '@/components/options/AddonsForm';
import HighlightsForm from '@/components/options/HighlightsForm';
import IncludesForm from '@/components/options/IncludesForm';
import PoliciesForm from '@/components/options/PoliciesForm';

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

const tabComponents = {
	city: <CityForm />,
	state: <StateForm />,
	category: <CategoryForm />,
	theme: <ThemeForm />,
	addons: <AddonsForm />,
	highlights: <HighlightsForm />,
	includes: <IncludesForm />,
	policies: <PoliciesForm />
};

export default function AddOptions() {
	const [ activeTab, setActiveTab ] = useState('city'); // default tab

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
					<CardTitle className="text-2xl font-semibold">Choose an Option</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 h-full">
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
				{optionTypes.map(({ value }) => (
					<TabsContent key={value} value={value}>
						{tabComponents[ value ]}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
