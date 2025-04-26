import ImageViewer from "@/components/image-preview";
import { IMessage } from "@/types/implement/message.interface";

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
								className={`max-h-[200px] rounded-lg object-cover opacity-100`}
								// onLoadingComplete={() => {
								// 	setIsLoadingImage(false);
								// }}
							/>
						</ImageViewer>
					);
				}

				return (
					<a
						key={index}
						href={file.url}
						target="_blank"
						rel="noopener noreferrer"
						className="break-words text-sm text-blue-600 underline"
					>
						📎 {file.data?.name || "Tệp đính kèm"}
					</a>
				);
			})}
		</div>
	);
};

export default renderFiles;
