"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { socketService } from "@/lib/socket/socket";

const PLACEHOLDER_IMAGE =
	"https://zalo-clone-vip-pro.me/Cloud/2a8218f4-1632-4db1-b87f-641406add685/bae6c760-cf53-445f-bf58-2e1835b1fffb-1745651704828-anh-anime-4k-003.jpg";

export default function Call() {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
	const remoteStreamRef = useRef<MediaStream | null>(null);

	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const params = useParams();
	const ROOM_ID = params.roomId as string;

	const configuration = {
		iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
	};

	useEffect(() => {
		const callDataRaw = localStorage.getItem("callData");

		const setupPeerConnection = async (isAnswerer: boolean, callData?: any) => {
			// Clear old connection
			if (peerConnectionRef.current) {
				peerConnectionRef.current.close();
				peerConnectionRef.current = null;
			}

			const pc = new RTCPeerConnection(configuration);
			peerConnectionRef.current = pc;

			// Local stream
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: true,
				});
				if (localVideoRef.current) {
					localVideoRef.current.srcObject = stream;
					localVideoRef.current.muted = true; // tự mute local để tránh echo
					localVideoRef.current.playsInline = true;
					await localVideoRef.current.play().catch(() => {});
				}
				stream.getTracks().forEach((track) => pc.addTrack(track, stream));
			} catch (err) {
				console.error("getUserMedia error:", err);
				setError("Không thể truy cập camera hoặc micro");
				return;
			}

			// Remote stream
			remoteStreamRef.current = new MediaStream();
			if (remoteVideoRef.current) {
				remoteVideoRef.current.srcObject = remoteStreamRef.current;
				remoteVideoRef.current.playsInline = true;
			}

			pc.ontrack = (event) => {
				console.log("Received track", event.track);
				if (!remoteStreamRef.current) {
					remoteStreamRef.current = new MediaStream();
				}
				remoteStreamRef.current.addTrack(event.track);
				if (remoteVideoRef.current) {
					remoteVideoRef.current.srcObject = remoteStreamRef.current;
					remoteVideoRef.current.play().catch(() => {});
				}
				setIsConnected(true);
			};

			// ICE candidate
			pc.onicecandidate = (event) => {
				if (event.candidate) {
					socketService.emit("ice-candidate", {
						roomId: ROOM_ID,
						candidate: event.candidate,
					});
				}
			};

			// Create answer
			if (isAnswerer && callData?.offer) {
				await pc.setRemoteDescription(new RTCSessionDescription(callData.offer));
				const answer = await pc.createAnswer();
				await pc.setLocalDescription(answer);
				socketService.emit("answer", { roomId: ROOM_ID, answer });
			}

			// Create offer
			if (!isAnswerer) {
				const offer = await pc.createOffer();
				await pc.setLocalDescription(offer);
				socketService.emit("offer", { roomId: ROOM_ID, offer });
			}

			// Debug state
			pc.oniceconnectionstatechange = () => {
				console.log("ICE State:", pc.iceConnectionState);
			};
			pc.onconnectionstatechange = () => {
				console.log("Connection State:", pc.connectionState);
			};
		};

		// Determine if offer or answer
		if (callDataRaw) {
			try {
				const callData = JSON.parse(callDataRaw);
				if (callData.type === "accept") {
					setupPeerConnection(true, callData); // answer
				}
			} catch (err) {
				setError("Dữ liệu cuộc gọi không hợp lệ");
			}
		} else {
			setupPeerConnection(false); // offer
		}

		return () => {
			peerConnectionRef.current?.close();
		};
	}, [ROOM_ID]);

	// Setup socket listener (only once)
	useEffect(() => {
		const handleAnswer = async (data: any) => {
			console.log("Received answer", data.answer);
			const pc = peerConnectionRef.current;
			if (!pc) return;
			try {
				await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
			} catch (err) {
				console.error("Lỗi khi set remote answer", err);
			}
		};

		const handleCandidate = async (data: any) => {
			console.log("Received ICE candidate", data.candidate);
			const pc = peerConnectionRef.current;
			if (!pc) return;
			try {
				await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
			} catch (err) {
				console.error("Lỗi khi add ICE candidate", err);
			}
		};

		socketService.on("answer", handleAnswer);
		socketService.on("ice-candidate", handleCandidate);

		return () => {
			socketService.off("answer", handleAnswer);
			socketService.off("ice-candidate", handleCandidate);
		};
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<h1 className="mb-4 text-2xl font-bold">Cuộc gọi: {ROOM_ID}</h1>

			{error && (
				<p className="mb-4 rounded bg-red-100 p-2 text-red-600">{error}</p>
			)}

			<div className="mb-4 flex flex-col gap-4 md:flex-row">
				<video
					id="local-video"
					ref={localVideoRef}
					autoPlay
					muted
					playsInline
					className="w-full rounded shadow md:w-1/2"
				/>
				<div className="flex w-full justify-center md:w-1/2">
					<video
						ref={remoteVideoRef}
						autoPlay
						playsInline
						className="w-full rounded shadow"
					/>
				</div>
			</div>
		</div>
	);
}
