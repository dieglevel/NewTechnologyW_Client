export const normalizeRoom = (data: any) => {
	const { latestMessage, room_id, ...rest } = data;
	if (!data.id) {
		return {
			...rest,
			id: room_id || latestMessage.roomId,
			latestMessage: latestMessage,
		};
	} else {
		return data;
	}
};
