import { api, ErrorResponse } from "@/lib/axios";
import { LocalStorageKey } from "@/lib/local-storage";
import { BaseResponse } from "@/types";
import { Account, Auth } from "@/types/implement";

export const loginApi = async (identifier: string, password: string) => {
	try {
		const response = await api.post<BaseResponse<Auth>>("/auth/login", { identifier, password });
		localStorage.setItem(LocalStorageKey.TOKEN, response.data.data.accessToken);

		return response.data;
	} catch (e) {
		throw e as ErrorResponse;
	}
};

// getAccount | Check account | Check connection
export const getAccountApi = async () => {
	try {
		const response = await api.get<BaseResponse<Account>>("/auth/my-account");
		return response.data;
	} catch (e) {
		throw e as ErrorResponse;
	}
};
