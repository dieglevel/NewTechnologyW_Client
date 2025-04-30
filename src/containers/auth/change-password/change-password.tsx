"use client";

import { EyeFilledIcon, EyeSlashFilledIcon, PhoneIcon } from "@/assets/svgs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { toast } from "@heroui/theme";
import { addToast, Toast } from "@heroui/toast";
import { useState } from "react";
import { checkUpdatePassword, handleChange } from "./handle";
import { useRouter, useSearchParams } from "next/navigation";
import { changePasswordApi, registerApi, updatePasswordApi } from "@/api/auth";
import { ErrorResponse } from "@/lib/axios";

export const ChangePassword = () => {
	const router = useRouter();

	const identifier = useSearchParams().get("identifier") || "";
	const [oldPassword, setOldPassword] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rePassword, setRePassword] = useState<string>("");

	const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showRePassword, setShowRePassword] = useState<boolean>(false);

	const [error, setError] = useState<{
		errorOldPassword: string;
		errorPassword: string;
		errorRePassword: string;
	}>({
		errorOldPassword: "",
		errorPassword: "",
		errorRePassword: "",
	});
	const [loading, setLoading] = useState<boolean>(false);

	const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOldPassword(e.target.value);
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleChangeRePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRePassword(e.target.value);
	};

	const handleSubmit = () => {
		setLoading(true);
		const checkField = checkUpdatePassword(password, rePassword, setError);
		if (!checkField) {
			setLoading(false);
			return;
		}

		const handleRegister = async () => {
			try {
				setLoading(true);
				await changePasswordApi(oldPassword, password);
				addToast({
					classNames: { title: "font-bold", description: "text-sm" },
					variant: "solid",
					title: "Đổi mật khẩu thành công",
					color: "success",
				});
				router.push("/chat");
			} catch (e) {
				const error = e as ErrorResponse;
				addToast({
					classNames: { title: "font-bold", description: "text-sm" },
					variant: "solid",
					title: "Đổi mật khẩu thất bại",
					description:
						error.statusCode === 404 ? "Sai mật khẩu cũ" : "Có lỗi xảy ra, vui lòng thử lại sau",
					color: "danger",
				});
				setLoading(false);
			}
		};

		handleRegister();
	};

	return (
		<div className="flex h-screen flex-col items-center gap-6 pt-14">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-6xl font-bold text-primary">Zalo</h1>
				<div className="flex flex-col items-center">
					<span className="">Đăng ký tài khoản Zalo</span>
					<span className="">Để kết nối với ứng dụng Zalo Web</span>
				</div>
			</div>
			<div className="flex w-128 flex-col items-center rounded-lg border bg-white">
				<div className="flex w-full flex-col items-center p-4">
					<span className="text-md font-semibold">Đặt lại mật khẩu Zalo</span>
					<hr className="mt-2 flex w-128 border-gray-300" />
				</div>

				<div className="flex w-full flex-col items-center justify-center gap-6 px-20 py-14">
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							errorMessage={error.errorOldPassword}
							isInvalid={!!error.errorOldPassword}
							classNames={{ errorMessage: "text-md", input: "text-xl" }}
							disabled={loading}
							variant="underlined"
							size="sm"
							value={oldPassword}
							onChange={handleChangeOldPassword}
							placeholder="Mật khẩu cũ"
							endContent={
								<button
									className="focus:outline-none"
									type="button"
									onClick={() => setShowOldPassword((prev) => !prev)}
								>
									{showOldPassword ? (
										<EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
									) : (
										<EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
									)}
								</button>
							}
							type={showOldPassword ? "text" : "password"}
						/>
					</div>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							errorMessage={error.errorPassword}
							isInvalid={!!error.errorPassword}
							classNames={{ errorMessage: "text-md", input: "text-xl" }}
							disabled={loading}
							variant="underlined"
							size="sm"
							value={password}
							onChange={handleChangePassword}
							placeholder="Mật khẩu mới"
							endContent={
								<button
									className="focus:outline-none"
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
								>
									{showPassword ? (
										<EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
									) : (
										<EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
									)}
								</button>
							}
							type={showPassword ? "text" : "password"}
						/>
					</div>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							errorMessage={error.errorRePassword}
							isInvalid={!!error.errorRePassword}
							disabled={loading}
							classNames={{ errorMessage: "text-md", input: "text-xl" }}
							variant="underlined"
							size="sm"
							value={rePassword}
							onChange={handleChangeRePassword}
							placeholder="Nhập lại mật khẩu"
							endContent={
								<button
									className="focus:outline-none"
									type="button"
									onClick={() => setShowRePassword((prev) => !prev)}
								>
									{showRePassword ? (
										<EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
									) : (
										<EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
									)}
								</button>
							}
							type={showRePassword ? "text" : "password"}
						/>
					</div>
					<Button
						isLoading={loading}
						disabled={loading}
						onPress={() => handleSubmit()}
						size="md"
						className="w-full bg-primary text-xl font-bold text-white"
					>
						Tiếp tục
					</Button>
				</div>
			</div>
		</div>
	);
};
