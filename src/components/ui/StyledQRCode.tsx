"use client";

import { useEffect, useRef, useState } from "react";
import  logo  from '@/assets/images/logo.png'

export default function StyledQRCode({ value }: { value: string }) {
	const ref = useRef(null);
	const [QRCodeStyling, setQRCodeStyling] = useState<any>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		import("qr-code-styling").then((module) => {
			const qrCode = new module.default({
				width: 250,
				height: 250,
				data: "default",
				image: logo.src,
				dotsOptions: {
					color: "#000000",
					type: "rounded",
				},
				cornersSquareOptions: {
					color: "#0068ff",
					type: "extra-rounded",
				},
				backgroundOptions: {
					color: "#ffffff",
				},
				imageOptions: {
					crossOrigin: "anonymous",
					imageSize: 0.3,
				},
			});
			setQRCodeStyling(qrCode);
			if (ref.current) qrCode.append(ref.current);
		});
	}, [value]);

	useEffect(() => {
		if (QRCodeStyling) QRCodeStyling.update({ data: value });
	}, [QRCodeStyling, value]);

	return (
		<div
			ref={ref}
			className="rounded-xl"
		/>
	);
}
