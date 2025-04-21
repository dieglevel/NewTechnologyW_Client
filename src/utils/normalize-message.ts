export const normalizeMessage = (data: any) => {
	const { _id, roomId, accountId, ...rest } = data;
	return {
		...rest,
		message_id: _id,
		room_id: roomId,
		account_id: accountId
	};
};
