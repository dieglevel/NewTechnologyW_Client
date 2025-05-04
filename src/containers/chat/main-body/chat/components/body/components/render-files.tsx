import ImageViewer from "@/components/image-preview";
import { IMessage } from "@/types/implement/message.interface";
import { FileIcon } from "lucide-react";
import { DocumentViewer } from "react-documents";

interface Props {
	message: IMessage;
	isSender: boolean;
}

export const renderFiles = ({ message, isSender }: Props) => {
	if (!message.files || message.files.length === 0) return null;

	const renderPreviewableFile = (fileUrl: string, type: string, sizeInBytes?: number) => {
		if (!fileUrl || !type || !sizeInBytes) return null;

		const isPdf = type === "application/pdf";
		const isDocOrXls = [
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/vnd.ms-excel",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		].includes(type);

		const isLightFile = sizeInBytes <= 50 * 1024; // <= 50KB

		// if ((isPdf || isDocOrXls) && isLightFile) {
		// 	return (
		// 		<DocumentViewer
		// 			url={fileUrl}
		// 			viewerUrl="https://docs.google.com/gview"
		// 			viewer="url"
		// 			overrideLocalhost="https://react-documents.firebaseapp.com/"
		// 			queryParams="embedded=true"
		// 			style={{ width: 300, height: 200, borderRadius: 8 }}
		// 		/>
		// 	);
		// }

		return null;
	};

	return (
		<div className="flex flex-wrap gap-2">
			{message.files.map((file, index) => {
				const fileType = file.data?.type || "";
				const isImage = fileType.startsWith("image/");
				const isVideo = fileType.startsWith("video/");

				if (isImage) {
					return (
						<ImageViewer
							key={index}
							src={file.url}
						>
							<img
								src={file.url}
								alt={file.data?.name || "image"}
								width={200}
								height={200}
								className="max-h-[200px] rounded-lg object-cover opacity-100"
							/>
						</ImageViewer>
					);
				}

				if (isVideo) {
					return (
						<video
							key={index}
							src={file.url}
							controls
							width={300}
							height={200}
							className="rounded-lg object-cover"
						>
							Your browser does not support the video tag.
						</video>
					);
				}

				return (
					<div
						key={index}
						className="flex flex-col gap-2"
					>
						{/* {renderPreviewableFile(file.url, fileType, Number(file.data?.size) || 0)} */}

						<a
							href={file.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-3 rounded-md border border-gray-300 p-2 transition-colors hover:bg-gray-100"
						>
							<FileIcon />
							<span className="break-words text-sm font-medium text-blue-600 underline">
								{file.data?.name || "Tệp đính kèm"}
							</span>
						</a>
					</div>
				);
			})}
		</div>
	);
};

