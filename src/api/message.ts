import { api, ErrorResponse } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { IMessage } from "@/types/implement/message.interface";
import { IRoom } from "@/types/implement/room.interface";

interface ISend {
	accountId?: string;
	roomId: string;
	content: string;
	type: string;
	files?: File[]; // multipleFiles
	sticker?: string;
}

interface IResponse {
	message: IMessage;
	room: IRoom;
}

export const sendMessage = async (data: ISend) => {
	try {
		const formData = new FormData();

		formData.append("roomId", data.roomId);
		formData.append("content", data.content);
		formData.append("type", data.type);

		if (data.accountId) {
			formData.append("accountId", data.accountId);
		}

		if (data.sticker) {
			formData.append("sticker", data.sticker);
		}

		if (data.files && data.files.length > 0) {
			data.files.forEach((file) => {
				formData.append("multipleFiles", file); // backend yêu cầu key là `multipleFiles`
			});
		}

		const response = await api.post<BaseResponse<IResponse>>("/message", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};
