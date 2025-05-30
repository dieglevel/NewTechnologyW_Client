"use client";
import { socketService } from "@/lib/socket/socket";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

interface PeerConnection {
	pc: RTCPeerConnection;
	userId: string;
}

const ROOM_ID = "81908e30-2e06-45cf-8df2-9a62e8ffef6b";

export default function Room() {
	const router = useRouter();
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideosRef = useRef<HTMLDivElement>(null);
	const peerConnectionsRef = useRef<Map<string, PeerConnection>>(new Map());

	const [users, setUsers] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);

	const createOffer = useCallback(async (pc: RTCPeerConnection, userId: string) => {
		try {
			const offer = await pc.createOffer();
			await pc.setLocalDescription(offer);
			socketService.emit("offer", {
				event: "offer",
				data: {
					roomId: ROOM_ID,
          to: userId,
					offer
				},
			});
		} catch (err) {
			console.error("Error creating offer:", err);
		}
	}, []);

	useEffect(() => {
		console.log("Connecting to socket server...");
		const configuration = {
			iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
		};
		const createPeerConnection = async (userId: string) => {
			const pc = new RTCPeerConnection(configuration);
			let localStream: MediaStream;
			try {
				localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
				if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
				localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
			} catch (err) {
				setError("Failed to access camera or microphone");
				console.error(err);
				return null;
			} 
			pc.onicecandidate = (event) => {
				if (event.candidate) {
					socketService.emit("ice-candidate", {
						roomId: ROOM_ID,
						candidate: event.candidate,
						to: userId,
					});
				}
			};
			createOffer(pc, ROOM_ID);
			return pc;
		};
    
    createPeerConnection(ROOM_ID)
    
	}, [createOffer]);

	

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<h1 className="mb-4 text-2xl font-bold">Room: {ROOM_ID}</h1>

			{error && <p className="mb-4 rounded bg-red-100 p-2 text-red-600">{error}</p>}

			<div className="mb-4 flex flex-col gap-4 md:flex-row">
				<video
					ref={localVideoRef}
					autoPlay
					muted
					className="w-full rounded shadow md:w-1/2"
				/>
				<div
					ref={remoteVideosRef}
					className="flex w-full flex-wrap gap-4 md:w-1/2"
				/>
			</div>
		</div>
	);
}
