"use client";



import "regenerator-runtime/runtime";
import { fcmTokenApi, getAccountApi } from "@/api/auth";
import { BodyView, OptionView, SecondBar, Sidebar } from "@/containers/chat";
import { IntroduceView } from "@/containers/chat/main-body/chat/introduce";
import ContactBody from "@/containers/chat/main-body/contact/contact-body/page";
import InformationModal from "@/containers/chat/sidebar/components/user/modal/information-modal";
import { useOptionView } from "@/hooks/option-view";
import { useSecondBar } from "@/hooks/second-bar";
import { LocalStorage } from "@/lib/local-storage";
import { RootState } from "@/redux/store";
import { SideBarSelected } from "@/redux/store/ui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { initialDataPage } from "./handle-initital-page";
import { SecondBarManager } from "./handle";
import Loading from "./loading";
import { getMessagingInstance } from "@/lib/firebase/firebase.messaging.client";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "@/lib/firebase/firebase.service";



const ChatPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { status: detailInformationStatus } = useSelector((state: RootState) => state.detailInformation);
	const { selected } = useSelector((state: RootState) => state.sidebar);
	const { isOpen } = useOptionView();
	const { isOpenSecondBar } = useSecondBar();	
	const { selectedRoom } = useSelector((state: RootState) => state.selectedRoom);

useEffect(() => {
  async function registerServiceWorkerAndGetToken() {
    if (!("serviceWorker" in navigator)) {
      console.log("Trình duyệt của bạn không hỗ trợ Service Worker.");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
      console.log("Service Worker registered:", registration);

      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

		await fcmTokenApi(currentToken)

      if (currentToken) {
        console.log("FCM Token:", currentToken);
        // TODO: Gửi token lên server
      } else {
        console.log("Chưa lấy được token FCM. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký Service Worker hoặc lấy token:", error);
    }
  }

  async function setupFCM() {
    if (!("Notification" in window)) {
      console.log("Trình duyệt của bạn không hỗ trợ Notification.");
      return;
    }

    try {
      if (Notification.permission === "granted") {
        await registerServiceWorkerAndGetToken();
      } else if (Notification.permission === "denied") {
        console.log("Bạn đã từ chối cấp quyền Notification trước đó.");
      } else {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Bạn đã bật thông báo.");
          await registerServiceWorkerAndGetToken();
        } else {
          console.log("Bạn đã từ chối nhận thông báo.");
        }
      }
    } catch (error) {
      console.error("Lỗi khi thiết lập Firebase Messaging:", error);
    }
  }

  setupFCM();

  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("Notification nhận được khi app mở:", payload);
    // TODO: Hiển thị UI notification hoặc toast
  });

  return () => unsubscribe();
}, []);


	useEffect(() => {
		const fetch = async () => {
			const token = localStorage.getItem(LocalStorage.token);
			if (token) {
				const data = await getAccountApi();

				if (data) {
					if (data.statusCode === 200) {
						const detailInformation = data.data.detailInformation;
						if (
							!detailInformation.fullName &&
							!detailInformation.avatarUrl &&
							!detailInformation.gender &&
							!detailInformation.dateOfBirth
						) {
							window.location.href = "/update-profile";
							return;
						}
					}
				}
			} else {
				localStorage.removeItem(LocalStorage.token);
				window.location.href = "/login";
			}
		};

		fetch();
	}, []);

	useEffect(() => {
		initialDataPage()
	}, []);


	useEffect(() => {
		if (detailInformationStatus === "succeeded") {
			setIsLoading(false);
		}
	}, [detailInformationStatus]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="flex h-screen min-w-[650px] flex-row">
					<InformationModal />
					<Sidebar />
					<SecondBarManager />
					<div className={`${isOpenSecondBar ? "block" : "hidden"}`}>
						<SecondBar />
					</div>
					{selected === SideBarSelected.Chat ? (
						<>
							{selectedRoom?.id ? (
								<>
									<BodyView />
									{isOpen && <OptionView />}
								</>
							) : (
								<IntroduceView />
							)}
						</>
					) : (
						<ContactBody />
					)}
				</div>
			)}
		</>
	);
};

export default ChatPage;
