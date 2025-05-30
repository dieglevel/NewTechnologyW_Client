"use client";

import type React from "react";

import { ImageIcon, SendIcon, UserChatIcon } from "@/assets/svgs";
import { Input } from "@heroui/input";
import { StickerForm } from "./components";
import { useEffect, useRef, useState } from "react";
import FilePreviewer from "./components/preview-file";
import { LocalStorage } from "@/lib/local-storage";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { sendMessage } from "@/api";
import type { EmojiClickData } from "emoji-picker-react";
import { FileIcon, Square, Play, Pause, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Spinner } from "@heroui/spinner";
import { useReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import VoiceTextIcon from "@/assets/svgs/voice-text";
import MicIcon from "@/assets/svgs/mic";

const EmojiForm = dynamic(() => import("./components/emoji-form"), {
	ssr: false,
	loading: () => <Spinner />,
});

export const FooterChat = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const inputImageRef = useRef<HTMLInputElement | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const [file, setFile] = useState<File[]>([]);
	const [message, setIMessage] = useState<string>("");
	const [isPlaying, setIsPlaying] = useState(false);
	const [recordingTime, setRecordingTime] = useState(0);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [activate, setActivate] = useState<boolean>(true);

	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);
	const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
		audio: true,
		onStart: () => {
			setRecordingTime(0);
			const id = setInterval(() => {
				setRecordingTime((prev) => prev + 1);
			}, 1000);
			setIntervalId(id);
		},
		onStop: () => {
			if (intervalId) {
				clearInterval(intervalId);
				setIntervalId(null);
			}
		},
	});
	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		setActivate(false);
	}

	const handleClickFile = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleClickImage = () => {
		if (inputImageRef.current) {
			inputImageRef.current.click();
		}
	};

	useEffect(() => {
		setIMessage(transcript);
	}, [transcript]);

	const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
		setIMessage((prev) => prev + emojiData.emoji);
	};

	const handleRemoveFile = (index: number) => {
		setFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setFile(Array.from(files));
		}
	};

	const addMessage = (message: string) => {
		if (message.trim() === "" && file.length === 0) return;
		handleSendMessage(message);
		setIMessage("");
		setFile([]);
	};

	const sendSticker = (sticker: string) => {
		if (sticker.trim() === "") return;
		handleSendMessage(sticker, "sticker");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			addMessage(message);
		}
	};

	const handleSendMessage = async (message: any, type: "mixed" | "sticker" | "call" = "mixed") => {
		try {
			if (type === "sticker") {
				await sendMessage({
					accountId: localStorage.getItem(LocalStorage.userId) || "",
					roomId: selectedRoom?.id || "",
					type,
					sticker: type === "sticker" ? message : undefined,
					files: file,
				});
			} else {
				await sendMessage({
					accountId: localStorage.getItem(LocalStorage.userId) || "",
					roomId: selectedRoom?.id || "",
					type,
					content: message,
					files: file,
				});
			}
		} catch (error) {
			// console.error("Lỗi gửi tin nhắn:", error);
		}
	};

	// Voice recording functions
	const handleStartRecording = () => {
		startRecording();
	};

	const handleStartListening = () => {
		resetTranscript();
		SpeechRecognition.startListening({ continuous: true, language: "vi-VN" });
	};

	const handleStopRecording = () => {
		stopRecording();
	};

	const handleStopListening = () => {
		SpeechRecognition.stopListening();
		resetTranscript();
	};

	const handlePlayVoice = () => {
		if (audioRef.current && mediaBlobUrl) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				audioRef.current.play();
				setIsPlaying(true);
			}
		}
	};

	const handleDeleteVoice = () => {
		clearBlobUrl();
		setIsPlaying(false);
		setRecordingTime(0);
	};

	const handleSendVoice = async () => {

		// try {
		// 	const params = {
		// 		audio: mediaBlobUrl || "",
		// 		speech_model: "universal" as any,
		// 	};

		// 	const run = async () => {
		// 		const transcript = await client.transcripts.transcribe(params);
		// 		console.log("Transcript:", transcript);
		// 	};

		// 	run()
		// } catch (error) {
		// 	console.error("Error sending voice message:", error);
		// }

		if (mediaBlobUrl) {
			const response = await fetch(mediaBlobUrl);
			const blob = await response.blob();
			const voiceFile = new File([blob], `voice-${Date.now()}.mp4`, { type: "audio/mp4" });

			try {
				await sendMessage({
					accountId: localStorage.getItem(LocalStorage.userId) || "",
					roomId: selectedRoom?.id || "",
					type: "mixed",
					files: [voiceFile],
				});
				handleDeleteVoice();
			} catch (error) {
				console.error("Error sending voice message:", error);
			}
		}
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	const isAudioPlaying = status === "recording";

	return (
		<div className="flex w-full flex-col border-t-1 bg-body">
			{listening && (
				<div className="flex items-center justify-between border-b-1 px-4 py-3">
					<div className="flex items-center gap-3">
						{listening ? (
							<>
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
									<span className="font-mono text-sm text-red-500">
										{formatTime(recordingTime)}
									</span>
								</div>
								<div className="flex items-center gap-1">
									{[...Array(20)].map((_, i) => (
										<div
											key={i}
											className="w-1 animate-bounce rounded-full bg-blue-500"
											style={{
												animationDelay: `${i * 0.3}s`,
												height: `${Math.random() * 20 + 10}px`,
											}}
										/>
									))}
								</div>
							</>
						) : null}
					</div>
				</div>
			)}

			{(isAudioPlaying || mediaBlobUrl) && (
				<div className="flex items-center justify-between border-b-1 px-4 py-3">
					<div className="flex items-center gap-3">
						{isAudioPlaying ? (
							<>
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
									<span className="font-mono text-sm text-red-500">
										{formatTime(recordingTime)}
									</span>
								</div>
								<div className="flex items-center gap-1">
									{[...Array(20)].map((_, i) => (
										<div
											key={i}
											className="w-1 animate-bounce rounded-full bg-red-500"
											style={{
												animationDelay: `${i * 0.1}s`,
												height: `${Math.random() * 20 + 10}px`,
											}}
										/>
									))}
								</div>
							</>
						) : (
							<div className="flex items-center gap-2">
								<MicIcon className="h-4 w-4 text-green-500" />
								<span className="text-sm">Voice message ready</span>
							</div>
						)}
					</div>

					<div className="flex items-center gap-2">
						{isAudioPlaying ? (
							<></>
						) : mediaBlobUrl ? (
							<>
								<button
									onClick={handlePlayVoice}
									className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 hover:bg-green-600"
								>
									{isPlaying ? (
										<Pause className="h-4 w-4 text-white" />
									) : (
										<Play className="h-4 w-4 text-white" />
									)}
								</button>
								<button
									onClick={handleDeleteVoice}
									className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600"
								>
									<Trash2 className="h-4 w-4 text-white" />
								</button>
								<button
									onClick={handleSendVoice}
									className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600"
								>
									<SendIcon className="size-4 stroke-slate-200 text-white" />
								</button>
							</>
						) : null}
					</div>
				</div>
			)}

			{mediaBlobUrl && (
				<audio
					ref={audioRef}
					src={mediaBlobUrl}
					onEnded={() => setIsPlaying(false)}
					className="hidden"
				/>
			)}

			<div className="flex gap-4 px-2 py-2">
				<StickerForm onSelectSticker={sendSticker} />
				<div
					onClick={handleClickImage}
					className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background"
				>
					<ImageIcon className="size-6 stroke-icon-second" />
				</div>
				<div
					onClick={handleClickFile}
					className="flex h-8 w-[32px] flex-none items-center justify-center rounded-sm bg-body hover:cursor-pointer hover:bg-background"
				>
					<FileIcon className="size-6 stroke-icon-second" />
				</div>
				<div
					onClick={isAudioPlaying ? handleStopRecording : handleStartRecording}
					// onClick={listening ? handleStopListening : handleStartListening}
					className={`flex h-8 w-[32px] flex-none items-center justify-center rounded-sm hover:cursor-pointer hover:bg-background ${
						isAudioPlaying ? "bg-red-100" : "bg-body"
					}`}
				>
					{isAudioPlaying ? (
						<Square className="size-6 stroke-red-500" />
					) : (
						<MicIcon className="size-4 fill-[#575757] stroke-icon-active text-[#575757]" />
					)}
				</div>
				<div
					// onClick={listening ? handleStopRecording : handleStartRecording}
					onClick={listening ? handleStopListening : handleStartListening}
					className={`flex ${activate ? "block" : "hidden"} h-8 w-[32px] flex-none items-center justify-center rounded-sm hover:cursor-pointer hover:bg-background ${
						listening ? "bg-red-100" : "bg-body"
					}`}
				>
					{listening ? (
						<Square className="size-6 stroke-red-500" />
					) : (
						<VoiceTextIcon className="size-9 self-start fill-[#575757] stroke-icon-active" />
					)}
				</div>
			</div>

			<div className="flex w-full items-center justify-center border-t-1">
				<Input
					placeholder="Type a message"
					className="w-full border-none"
					variant="bordered"
					onChange={(e) => setIMessage(e.target.value)}
					value={message}
					onKeyDown={handleKeyDown}
					classNames={{ input: ["bg-body"], inputWrapper: ["border-none", "shadow-none"] }}
				/>
				<EmojiForm onSelectEmoji={onEmojiClick} />
				<div
					onClick={() => addMessage(message)}
					className="flex h-8 w-[32px] flex-none cursor-pointer items-center justify-center rounded-sm hover:bg-background"
				>
					<SendIcon className="size-6 stroke-icon-second" />
				</div>
			</div>

			<Input
				ref={inputRef}
				type="file"
				multiple
				className="hidden"
				onChange={handleChange}
			/>

			<Input
				ref={inputImageRef}
				type="file"
				multiple
				className="hidden"
				onChange={handleChange}
				accept="image/*"
			/>

			{file.length > 0 && (
				<div className="flex w-full items-center gap-3 border-t-1 px-5">
					<FilePreviewer
						files={file}
						onClear={() => setFile([])}
						onRemoveFile={handleRemoveFile}
					/>
				</div>
			)}
		</div>
	);
};
