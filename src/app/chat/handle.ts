import { getRoom } from "@/api";

export const getRoomList = async () => {
    const response = await getRoom();
    if (response.statusCode === 200) {
        return response.data;
    } else {
        throw new Error(response.message);
    }
}