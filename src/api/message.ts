import { api, ErrorResponse } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { IMessage } from "@/types/implement/message.interface";
import { IRoom } from "@/types/implement/room.interface";

interface ISend {
	accountId?: string;
	roomId: string;
	content?: string;
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
		if (data.content) {
			formData.append("content", data.content);
		}
		// formData.append("content", data.content);
		formData.append("type", data.type);

		if (data.accountId) {
			formData.append("accountId", data.accountId);
		}

		if (data.sticker) {
			formData.append("sticker", data.sticker);
		}

		if (data.files && data.files.length > 0) {
			data.files.forEach((file) => {
				formData.append("multipleFiles", file);
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

export const getMessageByRoomId = async (roomId: string) => {
	try {
		const response = await api.get<BaseResponse<IMessage[]>>(`/message/get-all-message-of-room/${roomId}`);
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};

export const forwardMessage = async ({ messageId, roomId }: { messageId: string; roomId: string }) => {
	try {
		const response = await api.post<BaseResponse<IMessage>>("/message/forward", { messageId, roomId });
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};

export const revokeMessage = async ({ messageId }: { messageId: string }) => {
	try {
		const response = await api.delete<BaseResponse<IMessage>>(`/message/revoke/${messageId}`);
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};
export const deleteMessageById = async ({ messageId }: { messageId: string }) => {
	try {
		const response = await api.delete<BaseResponse<IMessage>>(`/message/remove-room-by-my-side/${messageId}`);
		return response;
	} catch (error) {
		throw error as ErrorResponse;
	}
};