import ImageViewer from "@/components/image-preview";
import { IMessage } from "@/types/implement/message.interface";
import Image from "next/image";

interface Props {
	url: string;
}

export const renderSticker = ({ url }: Props) => {
	return (
		<ImageViewer src={url}>
			<Image
				src={url}
				alt={"sticker"}
				width={150}
				height={150}
				className={`max-h-[200px] rounded-lg object-cover opacity-100`}
				// onLoadingComplete={() => {
				// 	setIsLoadingImage(false);
				// }}
			/>
		</ImageViewer>
	);
};
