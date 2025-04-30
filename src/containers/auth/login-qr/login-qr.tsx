"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import StyledQRCode from "@/components/ui/styled-QR-code";
import { getIpDeviceApi } from "@/api";
import { formatTime, handleGenerateQR } from "./handle";
import io from "socket.io-client";

export default function LoginQR() {
	const [qrValue, setQrValue] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [expired, setExpired] = useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const socketRef = useRef<any>(null);

	const QR_EXPIRY_TIME = 300;

	const connectSocket = (ipDevice: string, userAgent: string) => {



		if (socketRef.current) {
			socketRef.current.disconnect();
		}

		const socket = io(process.env.NEXT_PUBLIC_SOCKET_LOGINQR_URL, {
			autoConnect:true,
			extraHeaders: {
				ipDevice: `${ipDevice}`,
				userAgent: `${userAgent}`,
			},
		});


		socketRef.current = socket;

		socket.on("LOGIN", () => {
		});

		return socket;
	};

	const handleQRCodeGeneration = async () => {
		setLoading(true);
		setExpired(false);

		try {
			const ipDevice = await getIpDeviceApi();
			const userAgent = navigator.userAgent;

			connectSocket(ipDevice, userAgent);

			const qrData = await handleGenerateQR({ ipDevice, userAgent });
			setQrValue(qrData);
			setTimeLeft(QR_EXPIRY_TIME);
			setLoading(false);
		} catch (err) {
			console.error("Lỗi khi sinh QR:", err);
			setLoading(false);
		}
	};

	useEffect(() => {
		handleQRCodeGeneration();

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		if (loading || expired || timeLeft <= 0) {
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timer);
					setExpired(true);

					if (socketRef.current) {
						socketRef.current.disconnect();
					}

					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [loading, expired, timeLeft]);

	const handleRefresh = () => {
		handleQRCodeGeneration();
	};

	return (
		<div className="flex h-screen flex-col items-center gap-6 bg-[#e6f0ff] pt-14">
			<div className="flex flex-col items-center gap-3">
				<h1 className="text-6xl font-bold text-[#0068ff]">Zalo</h1>
				<div className="text-center text-[15px] leading-[20px] text-gray-700">
					<p>Đăng nhập tài khoản Zalo</p>
					<p>để kết nối với ứng dụng Zalo Web</p>
				</div>
			</div>

			{/* Khung QR */}
			<div className="flex min-w-[640] flex-col items-center rounded-2xl border bg-white shadow-md">
				<div className="w-full px-6 pt-5 text-center">
					<span className="text-lg font-semibold">Đăng nhập qua mã QR</span>
					<hr className="mt-3 border-gray-200" />
				</div>

				<div className="my-14 rounded-xl border bg-white p-3 shadow-sm">
					<div className="relative w-[250]">
						{loading ? (
							<p className="p-16 text-center text-sm text-gray-500">Đang tạo mã QR...</p>
						) : expired ? (
							<div className="flex flex-col items-center justify-center p-16">
								<p className="mb-4 text-sm text-red-500">Mã QR đã hết hạn</p>
								<Button
									onClick={handleRefresh}
									className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
								>
									Tạo lại mã QR
								</Button>
							</div>
						) : (
							<>
								<StyledQRCode value={qrValue} />
								<div className="mt-2 text-center text-sm text-gray-600">
									Hết hạn sau: {formatTime(timeLeft)}
								</div>
							</>
						)}
					</div>
					{!expired && !loading && (
						<>
							<p className="mt-2 text-center text-lg font-medium text-blue-700">
								Chỉ dùng để đăng nhập <br />
							</p>
							<p className="mt-2 text-center text-lg font-medium">Zalo trên máy tính</p>
						</>
					)}
				</div>
			</div>

			<div className="mt-6 text-sm text-blue-600">
				<Link href="/login">Đăng nhập bằng mật khẩu</Link>
			</div>
		</div>
	);
}
