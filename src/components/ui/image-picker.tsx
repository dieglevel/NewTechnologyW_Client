"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import Image from "next/image";

export default function ImagePickerButton({ onFileSelected }: { onFileSelected?: (file: File) => void }) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
			onFileSelected?.(file);
		}
	};

	return (
		<div className="relative size-16">
			<button
				type="button"
				onClick={handleButtonClick}
				className="flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-700 transition duration-200 hover:bg-gray-600"
			>
				{previewUrl ? (
					<Image
						src={previewUrl}
						alt="Preview"
						width={64}
						height={64}
						className="h-full w-full object-cover"
					/>
				) : (
					<Camera className="h-5 w-5 text-white" />
				)}
			</button>

			<Input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				onChange={handleFileChange}
				className="hidden"
			/>
		</div>
	);
}
