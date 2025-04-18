"use client";

import Close from "@/assets/svgs/close";
import Reload from "@/assets/svgs/reload";
import ZoomIn from "@/assets/svgs/zoom-in";
import ZoomOut from "@/assets/svgs/zoom-out";
import Image, { StaticImageData } from "next/image";
import { useState, useRef, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ImageViewerProps {
	src: string | StaticImageData;
	alt?: string;
	children: ReactNode; // trigger
}

export default function ImageViewer({ src, alt = "", children }: ImageViewerProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [zoom, setZoom] = useState<number>(0.5);
	const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [dragging, setDragging] = useState<boolean>(false);
	const lastMouse = useRef({ x: 0, y: 0 });

	const reset = () => {
		setZoom(0.5);
		setPosition({ x: 0, y: 0 });
	};

	const handleWheel = (e: React.WheelEvent) => {
		const delta = e.deltaY > 0 ? -0.8 : 0.8;
		setZoom((z) => Math.max(0.5, Math.min(z + delta, 10)));
	};

	const startDrag = (e: React.MouseEvent) => {
		setDragging(true);
		lastMouse.current = { x: e.clientX, y: e.clientY };
	};

	const onDrag = (e: MouseEvent) => {
		if (!dragging) return;
		const dx = e.clientX - lastMouse.current.x;
		const dy = e.clientY - lastMouse.current.y;
		setPosition((pos) => ({ x: pos.x + dx, y: pos.y + dy }));
		lastMouse.current = { x: e.clientX, y: e.clientY };
	};

	const stopDrag = () => setDragging(false);

	useEffect(() => {
		if (dragging) {
			window.addEventListener("mousemove", onDrag);
			window.addEventListener("mouseup", stopDrag);
		} else {
			window.removeEventListener("mousemove", onDrag);
			window.removeEventListener("mouseup", stopDrag);
		}
		return () => {
			window.removeEventListener("mousemove", onDrag);
			window.removeEventListener("mouseup", stopDrag);
		};
	}, [dragging]);

	return (
		<>
			<div
				onClick={() => {
					setIsOpen(true);
					reset();
				}}
				className="cursor-pointer"
			>
				{children}
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 !m-0 z-50 flex items-center justify-center bg-gray-900"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="relative z-0 flex h-full w-full items-center justify-center overflow-hidden"
							onClick={() => setIsOpen(false)}
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<Image
								onClick={(e) => e.stopPropagation()}
								onWheel={handleWheel}
								width={700}
								height={700}
								src={src}
								alt={alt}
								onMouseDown={startDrag}
								draggable={false}
								style={{
									transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
									transition: dragging ? "none" : "transform 0.2s ease",
									maxWidth: "auto",
									maxHeight: "auto",
									width: "auto",
									height: "auto",
									cursor: dragging ? "grabbing" : "grab",
								}}
								className="mx-auto select-none"
							/>
						</motion.div>

						<div className="absolute bottom-0 z-50 flex w-full items-center justify-center gap-4 bg-slate-800 p-3">
							<button
								onClick={() => setZoom((z) => Math.min(z + 0.2, 10))}
								className="p-2 text-black bg-inherit hover:bg-slate-700 rounded-full"
							>
								<ZoomIn className="size-6 fill-white" />
							</button>
							<button
								onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
								className="p-2 text-black bg-inherit hover:bg-slate-700 rounded-full"
							>
								<ZoomOut className="size-6 fill-white" />
							</button>
							<button
								onClick={reset}
								className="p-2 text-black bg-inherit hover:bg-slate-700 rounded-full"
							>
								<Reload className="size-6 fill-white stroke-white" />
							</button>
						</div>
						<div className="absolute right-0 top-0 z-50 p-4">
							<button
								onClick={() => setIsOpen(false)}
								className="p-2 text-black bg-slate-700 rounded-full"
							>
								<Close className="size-6 fill-white stroke-white" />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
