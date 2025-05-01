"use client";

import { EyeFilledIcon, EyeSlashFilledIcon, PhoneIcon } from "@/assets/svgs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { toast } from "@heroui/theme";
import { addToast, Toast } from "@heroui/toast";
import { useState } from "react";
import { checkRegister } from "./handle";
import { useRouter } from "next/navigation";
import { registerApi } from "@/api/auth";

export const Register = () => {
	const router = useRouter();

	const [identify, setIdentify] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rePassword, setRePassword] = useState<string>("");

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showRePassword, setShowRePassword] = useState<boolean>(false);

	const [error, setError] = useState<{
		errorIdentify: string;
		errorPassword: string;
		errorRePassword: string;
	}>({
		errorIdentify: "",
		errorPassword: "",
		errorRePassword: "",
	});
	const [loading, setLoading] = useState<boolean>(false);

	const handleChangeIdentify = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIdentify(e.target.value);
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleChangeRePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRePassword(e.target.value);
	};

	const handleSubmit = () => {
		setLoading(true);
		const checkField = checkRegister(identify, password, rePassword, setError);
		if (!checkField) {
			setLoading(false);
			return;
		}

		const handleRegister = async () => {
			try {
				const response = await registerApi(identify, password);
				if (response?.statusCode === 201) {
					addToast({
						title: "Đăng ký tài khoản thành công",
						color: "success",
					});

					router.push("/otp?identifier=" + identify + "&type=register");
				}
			} catch (e) {
				addToast({
					title: "Đăng ký tài khoản thất bại",
					color: "danger",
				});
			} finally {
				setLoading(false);
			}
		};

		handleRegister();

		// Call API to register here
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
					<span className="text-md font-semibold">Đăng ký tài khoản Zalo</span>
					<hr className="mt-2 flex w-128 border-gray-300" />
				</div>
				<div className="flex w-full flex-col items-center justify-center gap-6 px-20 py-14">
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							errorMessage={error.errorIdentify}
							isInvalid={!!error.errorIdentify}
							disabled={loading}
							classNames={{ errorMessage: "text-md", input: "text-xl" }}
							variant="underlined"
							size="sm"
							value={identify}
							onChange={handleChangeIdentify}
							placeholder="Số điện thoại hoặc email"
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
							placeholder="Mật khẩu"
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
						spinnerPlacement="end"
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
