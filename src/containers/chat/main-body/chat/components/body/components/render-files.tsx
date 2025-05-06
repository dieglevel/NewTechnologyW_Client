import ImageViewer from "@/components/image-preview";
import { IMessage } from "@/types/implement/message.interface";
import { DocumentViewer } from "react-documents";
import { CodePreview } from "./code-preview";
import { ExcelIcon, FileIcon, PDFIcon, WordIcon } from "@/assets/svgs";
import { Button } from "@heroui/button";
import { Download, DownloadIcon } from "lucide-react";
import { formatFileSize } from "@/utils/format-file-size";

interface Props {
	message: IMessage;
	isSender: boolean;
}

export const renderFiles = ({ message, isSender }: Props) => {
	if (!message.files || message.files.length === 0) return null;

	const renderPreviewableFile = (fileUrl: string, type: string, sizeInBytes?: number) => {
		if (!fileUrl || !type || !sizeInBytes) return null;

		const textLikeTypes = [
			"application/json",
			"application/javascript",
			"application/xml",
			"application/x-sh",
			"text/x-python",
			"text/x-c",
			"text/x-java-source",
			"text/x-markdown",
		];

		const isText = type.startsWith("text/") || textLikeTypes.includes(type);

		if (isText) {
			return <CodePreview url={fileUrl} />;
		}

		return null;
	};

	const getFileIcon = (fileType: string) => {
		if (fileType.includes("pdf")) return <PDFIcon className="size-11" />;
		if (fileType.includes("word")) return <WordIcon className="size-11" />;
		if (fileType.includes("sheet")) return <ExcelIcon className="size-11" />;
		return <FileIcon className="size-11" />;
	};

	const handlePreview = (fileUrl: string) => {
		if (!fileUrl) return;
		const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}`;
		window.open(viewerUrl);
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
						{renderPreviewableFile(file.url, fileType, Number(file.data?.size) || 0)}
						<Button
							type="button"
							onClick={() => handlePreview(file.url)}
							className="flex h-fit w-full items-center justify-between gap-3 rounded-lg bg-blue-200 p-0"
						>
							<div>{getFileIcon(fileType)}</div>
							<div className="flex w-full flex-col">
								<div className="self-start text-sm">
									<span className="line-clamp-1 max-w-[280px] truncate font-bold text-gray-800">
										{file.data?.name}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="self-end text-xs text-gray-500">
										{formatFileSize(Number(file.data?.size) || 0)}
									</span>
									<div className="rounded-sm bg-white p-1">
										<DownloadIcon className="size-4 self-center text-gray-500" />
									</div>
								</div>
							</div>
						</Button>
					</div>
				);
			})}
		</div>
	);
};
