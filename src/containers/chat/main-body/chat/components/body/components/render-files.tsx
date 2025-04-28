import ImageViewer from "@/components/image-preview";
import { IMessage } from "@/types/implement/message.interface";
import { FileIcon } from "lucide-react";

interface Props {
	message: IMessage;
	isSender: boolean;
}

const renderFiles = ({ message, isSender }: Props) => {
	if (!message.files || message.files.length === 0) return null;

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
					<a
						key={index}
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
				);
			})}
		</div>
	);
};

export default renderFiles;
