"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
	const route = useRouter();
	return (
		<>
			<div className="flex h-[100vh] w-full flex-col items-center justify-center space-x-8 space-y-16 lg:flex-row lg:space-y-0 2xl:space-x-0">
				<div className="flex w-full flex-col items-center justify-center text-center lg:px-2 xl:px-0">
					<p className="text-7xl font-bold tracking-wider text-gray-300 md:text-8xl lg:text-9xl">
						404
					</p>
					<p className="mt-2 text-4xl font-bold tracking-wider text-gray-300 md:text-5xl lg:text-6xl">
						Page Not Found
					</p>
					<p className="mt-4 mb-12 text-lg text-gray-500 md:text-xl lg:text-2xl">
						Sorry, the page you are looking for could not be found.
					</p>
					<Button onClick={() => route.back()}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
								clipRule="evenodd"
							></path>
						</svg>
						<span>Return Back</span>
					</Button>
				</div>
			</div >
		</>
	);
};

export default NotFound;
