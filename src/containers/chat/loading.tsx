"use client";

import { Spinner } from "@heroui/spinner";
export default function Loading() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Spinner size="lg" />
		</div>
	);
}
