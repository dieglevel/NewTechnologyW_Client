"use client";
import { LocalStorage } from "@/lib/local-storage";
import { socketService } from "@/lib/socket/socket";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_IMAGE =
	"http://res.cloudinary.com/dxzstf273/image/upload/v1748321318/e-commerce/hgp4v7rwpoodi4wzkvs0.jpg";

export default function Call() {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const params = useParams();
	const ROOM_ID = params.roomId as string;

	useEffect(() => {
		const callDataRaw = localStorage.getItem("callData");
		const configuration = {
			iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
		};

		const setupPeerConnection = async (isAnswerer: boolean, callData?: any) => {
			// Đóng kết nối cũ nếu có
			if (peerConnectionRef.current) {
				peerConnectionRef.current.close();
				peerConnectionRef.current = null;
			}

			const pc = new RTCPeerConnection(configuration);
			peerConnectionRef.current = pc;

			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: true,
				});
				if (localVideoRef.current) localVideoRef.current.srcObject = stream;

				// ✅ Kiểm tra trạng thái trước khi addTrack
				if (pc.signalingState !== "closed") {
					stream.getTracks().forEach((track) => pc.addTrack(track, stream));
				}
			} catch (err) {
				setError("Failed to access camera or microphone");
				console.error("getUserMedia error:", err);
				return;
			}

			// ICE candidate
			pc.onicecandidate = (event) => {
				if (event.candidate) {
					socketService.emit("ice-candidate", {
						roomId: ROOM_ID,
						candidate: event.candidate,
					});
				}
			};

			// Remote stream
			pc.ontrack = (event) => {
				const remoteStream = event.streams[0];
				if (remoteVideoRef.current) {
					remoteVideoRef.current.srcObject = remoteStream;
					setIsConnected(true);
				}
			};

			// Answer logic
			if (isAnswerer && callData?.offer) {
				console.log("Setting up as answerer with offer:", callData.offer);
				await pc.setRemoteDescription(new RTCSessionDescription(callData.offer));
				const answer = await pc.createAnswer();
				await pc.setLocalDescription(answer);
				socketService.emit("answer", { roomId: ROOM_ID, answer });
			}
			// Offer logic
			else if (!isAnswerer) {
				const offer = await pc.createOffer();
				await pc.setLocalDescription(offer);
				socketService.emit("offer", { roomId: ROOM_ID, offer });
			}
			console.log("Peer connection established");
			// Receive answer
			socketService.on("answer", async (data) => {
				try {
					await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
				} catch (err) {
					console.error("Failed to set remote answer", err);
				}
			});

			// Receive ICE candidate
			socketService.on("ice-candidate", async (data) => {
				try {
					await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
				} catch (err) {
					console.error("Failed to add ICE candidate", err);
				}
			});
		};

		// Decide role: offer or answer
		if (callDataRaw) {
			try {
				const callData = JSON.parse(callDataRaw);
				if (callData.type === "accept") {
					setupPeerConnection(true, callData); // Answerer
				}
			} catch (err) {
				setError("Invalid call data");
			}
		} else {
			setupPeerConnection(false); // Offerer
		}

		return () => {
			socketService.off("answer");
			socketService.off("ice-candidate");
			peerConnectionRef.current?.close();
		};
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<h1 className="mb-4 text-2xl font-bold">Call: {ROOM_ID}</h1>
			{error && <p className="mb-4 rounded bg-red-100 p-2 text-red-600">{error}</p>}
			<div className="mb-4 flex flex-col gap-4 md:flex-row">
				<video
					id="local-video"
					ref={localVideoRef}
					autoPlay
					muted
					className="w-full rounded shadow md:w-1/2"
				/>
				<div className="flex w-full justify-center md:w-1/2">
					{isConnected ? (
						<video
							ref={remoteVideoRef}
							autoPlay
							className="w-full rounded shadow"
						/>
					) : (
						<img
							src={PLACEHOLDER_IMAGE}
							alt="No connection"
							className="w-full rounded shadow"
						/>
					)}
				</div>
			</div>
		</div>
	);
}
