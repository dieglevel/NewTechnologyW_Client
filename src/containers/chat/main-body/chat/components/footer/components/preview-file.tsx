import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/logo.png";
import ImageViewer from "@/components/image-preview";
import { Bin } from "@/assets/svgs";
import { doc, pdf } from "@/assets/images";
import FilePreview from "@/assets/svgs/filePreview";
import Word from "@/assets/svgs/word";
import PDF from "@/assets/svgs/pdf";

interface FilePreviewerProps {
	files: File[];
	onClear: () => void;
	onRemoveFile?: (index: number) => void;
}

const FilePreviewer = ({ files, onClear, onRemoveFile }: FilePreviewerProps) => {
	const previews = files.map((file) => ({
		url: URL.createObjectURL(file),
		type: file.type,
		name: file.name,
	}));

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const handleRemoveFile = (index: number) => {
		if (onRemoveFile) {
			onRemoveFile(index);
		}
	};

	return (
		<div className="flex w-full flex-col gap-2 px-2 py-2">
			<div className="mt-2 flex justify-end">
				<button
					onClick={onClear}
					className="rounded-md border border-red-400 px-3 py-1 text-sm text-red-500 hover:bg-red-50"
				>
					Xóa tất cả
				</button>
			</div>
			<div className="flex flex-wrap gap-4">
				{previews.map((preview, index) => {
					const isImage = preview.type.startsWith("image/");
					const isPDF = preview.type === "application/pdf";
					const isDoc = preview.type === "application/msword" || preview.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
					return (
						<div
							key={index}
							className="relative flex flex-col items-center justify-between"
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							{hoveredIndex === index && (
								<button
									onClick={() => handleRemoveFile(index)}
									className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-all hover:bg-red-600"
								>
									<Bin className="w-3"></Bin>
								</button>
							)}
							<ImageViewer
								src={isImage ? preview.url : logo}
								alt={`preview ${index}`}
							>
								{isImage ? (
									<Image
										src={preview.url}
										alt={`preview ${index}`}
										width={50}
										height={50}
										className="h-[50px] w-[50px] rounded-md object-cover"
									/>
								) : isPDF ? (
									<PDF className="h-[50px] w-[50px] rounded-md object-cover" />
								) : isDoc ? (
									<Word className="h-[50px] w-[50px] rounded-md object-cover" />
								) : (
									<FilePreview className="h-[50px] w-[50px] rounded-md object-cover" />
								)}
							</ImageViewer>

							<p className="text-text-secondary line-clamp-1 w-[50px] text-center text-xs">
								{preview.name}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FilePreviewer;
