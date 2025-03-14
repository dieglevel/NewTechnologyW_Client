import { api, setAccessToken } from "@/lib/axios";
import { LocalStorageKey } from "@/lib/local-storage";
import { BaseResponse } from "@/types";
import { Auth } from "@/types/implement";
import axios from "axios";

export const loginApi = async (identifier: string, password: string) => {
	const ipDevice = await axios.get("https://api.ipify.org?format=json");

	try {
		const response = await api.post(
			"/auth/login",
			{ identifier, password },
			{
				headers: { "ip-device": ipDevice.data.ip },
			},
		);
		if (response) {
			const data: BaseResponse<Auth> = await response.data;
			setAccessToken(data.data.accessToken);
         console.log(data.data.accessToken)

			localStorage.setItem(LocalStorageKey.TOKEN, data.data.accessToken);

			window.location.href = "/chat";
			return data;
		}
	} catch (e) {
		return e;
	}
};

// getAccount
// export const getAccountApi = async () => {
// 	try {
// 		const response = await api.get("/auth/my-account");
// 		if (response) {
// 			const data: BaseResponse<Account> = response.data;
//          console.log(response.data)
// 			if (data.statusCode === 200) {
// 				return data.data;
// 			} else {
// 				setAccessToken(null);
// 				localStorage.removeItem(LocalStorageKey.TOKEN);
// 				window.location.href = "/login";
// 			}
// 		}
// 	} catch (e) {
// 		return e;
// 	}
// };
