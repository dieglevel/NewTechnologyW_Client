import ImageViewer from "@/components/image-preview";
import { IMessage } from "@/types/implement/message.interface";
import { CodePreview } from "./code-preview";
import { ExcelIcon, FileIcon, PDFIcon, WordIcon } from "@/assets/svgs";
import { Button } from "@heroui/button";
import { DownloadIcon } from "lucide-react";
import { formatFileSize } from "@/utils/format-file-size";
import { getDataFile } from "@/api";
import { useEffect, useState } from "react";
import { downloadFile, previewFile } from "@/utils/handle-file";

interface Props {
	message: IMessage;
	isSender: boolean;
}

export const renderFiles = ({ message, isSender }: Props) => {
	const [textData, setTextData] = useState<string>();

	const textLikeTypes = ["application/json", "application/javascript", "application/xml", "application/x-sh"];

	useEffect(() => {
		const fetchData = async () => {
			for (const file of message.files ?? []) {
				const type = file.data?.type || "";

				if (type.startsWith("text/") || textLikeTypes.includes(type)) {
					try {
						const dataFile = await getDataFile(file.url);
						setTextData(dataFile);
					} catch (err) {
						console.error("Failed to fetch file content", err);
					}
				}
			}
		};

		fetchData();
	}, [message]);

	const getFileIcon = (type: string) => {
		if (type.includes("pdf")) return <PDFIcon className="size-11" />;
		if (type.includes("word")) return <WordIcon className="size-11" />;
		if (type.includes("sheet")) return <ExcelIcon className="size-11" />;
		return <FileIcon className="size-11" />;
	};

	return (
		<div className="flex flex-wrap gap-2">
			{message.files?.map((file, index) => {
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
						/>
					);
				}

				return (
					<div
						key={index}
						className="flex flex-col gap-2"
					>
						{(file.data?.type?.startsWith("text/") ||
							textLikeTypes.includes(file.data?.type || "")) &&
						textData ? (
							<CodePreview data={textData} />
						) : null}
						<Button
							type="button"
							onClick={() => previewFile(file.url)}
							className={`flex h-fit w-full justify-between gap-3 rounded-lg ${isSender ? "bg-blue-200" : "bg-body"} p-0`}
						>
							<div>{getFileIcon(fileType)}</div>
							<div className="flex w-full flex-col">
								<span className="line-clamp-1 max-w-[280px] self-start truncate font-bold text-gray-800">
									{file.data?.name}
								</span>
								<div className="flex justify-between">
									<span className="text-xs text-gray-500">
										{formatFileSize(Number(file.data?.size) || 0)}
									</span>
									<a
										className="rounded-sm bg-white p-1"
										onClick={(e) => {
											e.stopPropagation();
											downloadFile(
												textData || file.url,
												file.data?.name || "file.txt",
												fileType,
											);
										}}
									>
										<DownloadIcon className="size-4 self-center text-gray-500" />
									</a>
								</div>
							</div>
						</Button>
					</div>
				);
			})}
		</div>
	);
};
