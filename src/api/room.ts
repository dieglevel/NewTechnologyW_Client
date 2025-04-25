import { api, ErrorResponse } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { IRoom } from "@/types/implement/room.interface";

interface ICreateGroup {
	name: string;
}
interface IAddMember {
   roomId: string;
	listAccount: string[];
}

export const getRoom = async () => {
	try {
		const response = await api.get<BaseResponse<IRoom[]>>(`/chatroom-merge/my-list-room`);
		// console.log("response ne troi: ", response.data);
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};

export const createRoom = async (data: ICreateGroup) => {
	try {
		const response = await api.post<BaseResponse<IRoom>>(`/chat-room/create-group`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log("Room created successfully:", response.data);
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};

export const addMember = async (data: IAddMember) => {
	try {
		const response = await api.post<BaseResponse<IRoom>>(
			`/chat-room/add-member?chatRoomID=${data.roomId}`,
			{ userAddIDs: data.listAccount },
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		console.log("Member added successfully:", response.data);
		return response.data;
	} catch (error) {
		throw error as ErrorResponse;
	}
};