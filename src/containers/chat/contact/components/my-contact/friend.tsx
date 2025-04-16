import Image from "next/image";

const Friend = () => {
	return (
		<div className="flex w-full flex-col gap-5 hover:bg-primary-100 p-4 border-b-1  border-gray-300  transition duration-75 ease-in-out">
			<div className="flex flex-row items-center justify-start gap-4">
				<div className="flex items-center justify-center rounded-full border-4 border-primary-400">
					<Image
						src={"https://i.pinimg.com/736x/e1/08/08/e10808551f8751d18fe892d88efd80d3.jpg"}
						alt="Friend Image"
						width={300}
						height={200}
						className="size-12 rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col items-start justify-center">
					<div className="text-center text-lg font-semibold">Friend Name</div>
				</div>
			</div>


		</div>
	);
};

export default Friend;
