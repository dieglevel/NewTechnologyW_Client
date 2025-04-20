export const normalizeRoom = (data: any) => {
	const { room_id, ...rest } = data;
	return {
		...rest,
		id: room_id,
	};
};
