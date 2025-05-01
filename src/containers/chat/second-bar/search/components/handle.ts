import { IFriend } from "@/types/implement";

export const filterFriend = (myListFriend: IFriend[], search:string) => {
    if(!search) return myListFriend;
    const filteredFriends = myListFriend?.filter((friend) =>
		friend?.detail?.fullName?.toLowerCase().includes(search.toLowerCase())
    );
    return filteredFriends;
}
 