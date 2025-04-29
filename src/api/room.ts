import { api, ErrorResponse } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { IRoom } from "@/types/implement/room.interface";

interface ICreateGroup {
	name: string;
	avatarUrl?: File; // optional avatar URL
}
interface IAddMember {
	roomId: string;
	listAccount: string[];
}

interface IDeleteMember {
	roomId: string;
	removeUserID: string;
}

interface IAssignSubAdmin {
	role: string;
	accountId: string;
	chatRoomId: string;
}

export const getRoom = async () => {
	try {
		const response = await api.get<BaseResponse<IRoom[]>>(`/chatroom-merge/my-list-room`);
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};

export const createRoom = async (data: ICreateGroup) => {
	try {
		const formData = new FormData();
		formData.append("name", data.name);
		if (data.avatarUrl) {
			formData.append("avatar", data.avatarUrl); // TODO: upload avatar
		}

		const response = await api.post<BaseResponse<IRoom>>(`/chat-room/create-group`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};

export const addMember = async (data: IAddMember) => {
	try {
		const response = await api.post<BaseResponse<IRoom>>(`/chat-room/add-member?chatRoomID=${data.roomId}`, {
			userAddIDs: data.listAccount,
		});
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};

export const deleteMember = async (data: IDeleteMember) => {
	try {
		const response = await api.post<BaseResponse<IRoom>>(`/chat-room/remove-member?chatRoomID=${data.roomId}`, {
			removeUserID: data.removeUserID,
		});
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};

export const disbandGroup = async (data: string) => {
	try {
		const response = await api.post<BaseResponse<IRoom>>(`/chat-room/disband?chatRoomID=${data}`);
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};

export const assignSubAdmin = async (data: IAssignSubAdmin) => {
	try {
		const response = await api.put<BaseResponse<IRoom>>(`/user-config/assign-role`, {data});
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};