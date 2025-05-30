import { LocalStorage } from "@/lib/local-storage";
import { Socket } from "socket.io-client";

const CallSocket = (socket: Socket | null) => {
    const configuration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    // Lưu peerConnection và localStream trong một Map để hỗ trợ nhiều kết nối nếu cần
    const peerConnections = new Map<string, RTCPeerConnection>();
    let localStream: MediaStream | null = null;

    socket?.on("offer", async (data) => {
        console.log("Received offer:", data);
        const currentUserId = localStorage.getItem(LocalStorage.userId);
        // if (data.to !== currentUserId) {
        //     console.log("Offer not intended for this user");
        //     return;
        // }

        const accept = window.confirm("📞 Incoming call! Do you want to accept?");
        if (!accept) {
            console.log("User rejected the call");
            return;
        }

        // 1. Tạo RTCPeerConnection mới
        const peerConnection = new RTCPeerConnection(configuration);
        peerConnections.set(data.from, peerConnection);

        // 2. Lấy local media stream (mic + cam)
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, localStream!);
            });

            // Hiển thị local stream
            const localVideo = document.querySelector("#local-video") as HTMLVideoElement;
            if (localVideo) localVideo.srcObject = localStream;
        } catch (err) {
            console.error("Failed to get local stream:", err);
            return;
        }

        // 3. Đặt remote offer
        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        } catch (err) {
            console.error("Error setting remote description:", err);
            return;
        }

        // 4. Tạo answer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        // 5. Gửi answer ngược lại
        socket.emit("answer", {
            roomId: data.roomId,
            answer,
            to: data.from,
            from: currentUserId,
        });

        // 6. Lắng nghe ICE candidate
        peerConnection.onicecandidate = (event) => {
            if (event.candidate && (event.candidate.sdpMid !== null || event.candidate.sdpMLineIndex !== null)) {
                socket.emit("ice-candidate", {
                    roomId: data.roomId,
                    candidate: event.candidate,
                    to: data.from,
                    from: currentUserId,
                });
            }
        };

        // 7. Hiển thị remote stream
        peerConnection.ontrack = (event) => {
            const remoteStream = event.streams[0];
            const videoElement = document.createElement("video");
            videoElement.srcObject = remoteStream;
            videoElement.autoplay = true;
            videoElement.className = "w-full rounded shadow";
            const remoteVideos = document.querySelector("#remote-videos");
            if (remoteVideos) remoteVideos.appendChild(videoElement);
        };

        // Xóa chuyển hướng không cần thiết
        // window.location.href = `http://localhost:3000/call/${data.roomId}`;
    });

    socket?.on("answer", async (data) => {
        console.log("Received answer:", data);
        const currentUserId = localStorage.getItem(LocalStorage.userId);
        if (data.to !== currentUserId) return;

        const peerConnection = peerConnections.get(data.from);
        if (peerConnection) {
            try {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            } catch (err) {
                console.error("Error setting remote description:", err);
            }
        }
    });

    socket?.on("ice-candidate", async (data) => {
        console.log("Received ICE candidate:", data);
        const currentUserId = localStorage.getItem(LocalStorage.userId);
        if (data.to !== currentUserId) return;

        const peerConnection = peerConnections.get(data.from);
        if (peerConnection && data.candidate && (data.candidate.sdpMid !== null || data.candidate.sdpMLineIndex !== null)) {
            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            } catch (err) {
                console.error("Error adding received ICE candidate:", err);
            }
        } else {
            console.error("Invalid ICE candidate or peerConnection:", data.candidate);
        }
    });

    // Cleanup khi socket ngắt kết nối
    socket?.on("disconnect", () => {
        peerConnections.forEach((pc) => pc.close());
        peerConnections.clear();
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
        }
    });
};

export default CallSocket;