"use client";

import { LockIcon, PhoneIcon } from "@/assets/svgs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { handleCheckPage, handleLogin } from "./handle";

const tempData = [
	"ldmhieudev@yopmail.com",
	"khtgdd@yopmail.com",
	"dieglevel@yopmail.com",
	"colnat412@yopmail.com",
	"ntdinh25@yopmail.com",
];

export const Login = () => {
	const [identifier, setIdentifier] = useState<string>("ldmhieudev@yopmail.com");
	const [password, setPassword] = useState<string>("admin");
	const router = useRouter();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		handleCheckPage();
	}, []);

	const handleKeyPress = async (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			await handleLogin(setIsLoading, identifier, password, router);
		}
	};

	const handlePressAccount = (account: string) => {
		setIdentifier(account)
	};

	return (
		<div
			className="flex h-screen flex-col items-center gap-6 pt-14"
			onKeyDown={handleKeyPress}
		>
			<div className="flex gap-3 flex-col">
				{tempData.map((item, index) => (
					<div key={index} className="border-1 rounded-lg justify-center items-center cursor-pointer" onClick={() => {handlePressAccount(item)}}>
						<p>{item}</p>
					</div>
				))}
			</div>
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-6xl font-bold text-primary">Zalo</h1>
				<div className="flex flex-col items-center">
					<span className="">Đăng nhập tài khoản Zalo</span>
					<span className="">Để kết nối với ứng dụng Zalo Web</span>
				</div>
			</div>
			<div className="flex h-128 w-128 flex-col items-center rounded-lg border bg-white">
				<div className="flex w-full flex-col items-center p-4">
					<span className="text-md font-semibold">Đăng nhập với mật khẩu</span>
					<hr className="mt-2 flex w-128 border-gray-300" />
				</div>
				<div className="flex w-full flex-col items-center justify-center gap-6 p-20">
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							isDisabled={isLoading}
							value={identifier}
							onChange={(e) => setIdentifier(e.target.value)}
							variant="underlined"
							size="sm"
							placeholder="Số điện thoại hoặc email"
						/>
					</div>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							isDisabled={isLoading}
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Mật khẩu"
							size="sm"
							variant="underlined"
						/>
					</div>
					<Button
						isDisabled={isLoading}
						isLoading={isLoading}
						spinnerPlacement="end"
						size="md"
						className="w-full bg-primary text-white"
						onPress={async () => {
							await handleLogin(setIsLoading, identifier, password, router);
						}}
					>
						Đăng nhập
					</Button>
					<Link
						href="/forgot-password"
						className="text-md text-black"
					>
						Quên mật khẩu
					</Link>
					<Link
						href="/register"
						className="text-md text-primary"
					>
						Bạn chưa có tài khoản? Đăng ký ngay
					</Link>
					<Link
						href="/login-qr"
						className="mt-10 flex font-semibold text-primary"
					>
						Đăng nhập qua mã QR
					</Link>
				</div>
			</div>
		</div>
	);
};
