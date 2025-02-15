import { avatarDefault } from "@/assets/images";
import { CalendarIcon, PhoneIcon } from "@/assets/svgs";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import Image from "next/image";

export const UpdateProfile = () => {
	return (
		<div className="flex h-screen flex-col items-center gap-6 pt-14">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-6xl font-bold text-primary">Zalo</h1>
				<div className="flex flex-col items-center">
					<span className="">Đăng ký tài khoản Zalo</span>
					<span className="">Để kết nối với ứng dụng Zalo Web</span>
				</div>
			</div>
			<div className="flex h-128 w-128 flex-col items-center rounded-lg border bg-white">
				<div className="flex w-full flex-col items-center p-4">
					<span className="text-md font-semibold">Đăng ký tài khoản Zalo</span>
					<hr className="mt-2 flex w-128 border-gray-300" />
				</div>
				<div className="flex w-full flex-col items-center justify-center gap-6 px-20 py-10">
					<div className="flex w-full flex-col items-center justify-center gap-2">
						<Image
						priority
							src={avatarDefault}
							alt="Avatar"
							width={100}
							height={100}
						/>
						<Input
							type="file"
							accept="image/*"
							size="md"
							variant="faded"
							className="w-1/3"
							classNames={{
								input: "text-white file:text-white file:border-none",
								inputWrapper: "bg-primary",
							}}
						/>
					</div>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							startContent={<PhoneIcon className="size-5 text-icon" />}
							variant="underlined"
							size="sm"
							placeholder="Họ và tên"
						/>
					</div>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							type="date"
							startContent={<CalendarIcon className="size-5" />}
							size="sm"
							variant="underlined"
						/>
					</div>
					<RadioGroup
						className="flex w-full items-start justify-start"
						orientation="horizontal"
					>
						<Radio value="0">Nam</Radio>
						<Radio value="1">Nữ</Radio>
					</RadioGroup>
					<Button
						size="md"
						className="w-full bg-primary text-white"
					>
						Xác nhận
					</Button>
				</div>
			</div>
		</div>
	);
};