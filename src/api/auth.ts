import { Register } from "@/containers/auth";
import { api, ErrorResponse } from "@/lib/axios";
import { LocalStorage } from "@/lib/local-storage";
import { BaseResponse } from "@/types";
import { IAuth, IDetailInformation } from "@/types/implement";
import { ISearchAccount } from "@/types/implement/response";

export const loginApi = async (identifier: string, password: string) => {
	try {
		const response = await api.post<BaseResponse<IAuth>>("/auth/login", { identifier: identifier.toLowerCase(), password });
		localStorage.setItem(LocalStorage.token, response.data.data.accessToken);
		localStorage.setItem(LocalStorage.userId, response.data.data.userId);
		return response.data;
	} catch (e) {
		throw e as ErrorResponse;
	}
};

// getAccount | Check account | Check connection
export const getAccountApi = async () => {
	try {
		const response = await api.get<
			BaseResponse<{
				detailInformation: IDetailInformation;
			}>
		>("/auth/my-account");

		return response.data;
	} catch (e) {
		throw e as ErrorResponse;
	}
};

export const registerApi = async (identifier: string, password: string) => {
	try {
		const isPhoneNumber = identifier.match(/^\d{10}$/);
		if (isPhoneNumber) {
			const response = await api.post<BaseResponse<IAuth>>("/auth/register", {
				email: "",
				phone: identifier,
				password,
			});
			return response.data;
		}

		// check if email === true
		const isEmail = identifier.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
		if (isEmail) {
			const response = await api.post<BaseResponse<IAuth>>("/auth/register", {
				email: identifier.toLowerCase(),
				phone: "",
				password,
			});
			return response.data;
		}
	} catch (e) {
		throw e as ErrorResponse;
	}
};

export const forgetApi = async (identifier: string) => {
	try {
		const isPhoneNumber = identifier.match(/^\d{10}$/);
		const isEmail = identifier.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

		if (isPhoneNumber || isEmail) {
			const response = await api.post<BaseResponse<IAuth>>("/auth/send-otp-forget", {
				identifier: identifier.toLowerCase(),
			});
			return response.data;
		}
	} catch (e) {
		throw e as ErrorResponse;
	}
};

export const updatePasswordApi = async (identifier: string, password: string) => {
	try {
		const isPhoneNumber = identifier.match(/^\d{10}$/);
		if (isPhoneNumber) {
			const response = await api.post<BaseResponse<IAuth>>("/auth/update-password-forget", {
				identifier: identifier.toLowerCase(),
				newPassword: password,
			});
			return response.data;
		}

		// check if email === true
		const isEmail = identifier.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
		if (isEmail) {
			const response = await api.post<BaseResponse<IAuth>>("/auth/update-password-forget", {
				identifier: identifier.toLowerCase(),
				newPassword: password,
			});
			return response.data;
		}
	} catch (e) {
		throw e as ErrorResponse;
	}
};

export const verifyAccount = async (identifier: string, otp: string) => {
	try {
		const response = await api.post<BaseResponse<null>>("/auth/verify-otp", { identifier: identifier.toLowerCase(), otp });

		return response.data;
	} catch (e) {
		throw e as ErrorResponse;
	}
};

export const verifyForgetPassword = async (identifier: string, otp: string) => {
	try {
		const response = await api.post<BaseResponse<null>>("/auth/verify-otp-forget", { identifier: identifier.toLowerCase(), otp });

		return response.data;
	} catch (e) {
		throw e as ErrorResponse;
	}
};

export const findAccount = async (identifier: string) => {
	try {

		// check if phone number === true
		const isPhoneNumber = identifier.match(/^\d{10}$/);
		if (isPhoneNumber) {
			const response = await api.get<BaseResponse<ISearchAccount[]>>(`auth/search?keywork=${identifier}`,);
			return response.data;
		}

		const response = await api.get<BaseResponse<ISearchAccount[]>>(`auth/search?keywork=${identifier}`,);

		return response.data;
	} catch (e) {
		throw e as ErrorResponse;
	}
}