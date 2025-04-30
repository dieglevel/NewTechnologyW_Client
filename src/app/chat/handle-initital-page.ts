import { getListFriend, getListResponseFriend, getListSended, getProfile, getRoom } from "@/api";
import { ErrorResponse } from "@/lib/axios";
import { store } from "@/redux/store";
import { initDetailInformation, initMyListFriend, initRequestFriend, initRoom, initSendedFriend } from "@/redux/store/models";

const initialListRoom = async () => {
    try {
        const response = await getRoom();
        if (response?.statusCode === 200) {
            store.dispatch(initRoom(response.data.listRoomResponse));
        }
    } catch (error) {
        const e = error as ErrorResponse;
    }
}

const initialListFriend = async () => {
    try {
        const response = await getListFriend();
        if (response?.statusCode === 200) {
            store.dispatch(initMyListFriend(response.data));
        }
    } catch (error) {
        const e = error as ErrorResponse;
    }
}

const initialListSended = async () => {
    try {
        const response = await getListSended();
        if (response?.statusCode === 200) {
            store.dispatch(initSendedFriend(response.data));
        }
    } catch (error) {
        const e = error as ErrorResponse;
    }
}

const initialListReponseFriend = async () => {
    try {
        const response = await getListResponseFriend();
        if (response?.statusCode === 200) {
            store.dispatch(initRequestFriend(response.data));
        }
    } catch (error) {
        const e = error as ErrorResponse;
    }
}

const initialMyDetailInformation = async () => {
    try {
        const response = await getProfile();
        if (response?.statusCode === 200) {
            store.dispatch(initDetailInformation(response.data));
        }
    } catch (error) {
        const e = error as ErrorResponse;
    }
}



export const initialDataPage = async () => {
    initialMyDetailInformation()
    initialListRoom()
    initialListFriend()
    initialListSended()
    initialListReponseFriend()
}