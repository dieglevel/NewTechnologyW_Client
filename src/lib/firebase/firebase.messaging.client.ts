import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { messaging } from "./firebase.service";

const firebaseConfig = {
  apiKey: "AIzaSyBuRydKaP0revM7Hy29EXiM3vnpxPWScW8",
  authDomain: "webzalo-d3df7.firebaseapp.com",
  projectId: "webzalo-d3df7",
  storageBucket: "webzalo-d3df7.appspot.com",
  messagingSenderId: "1016001936576",
  appId: "1:1016001936576:web:fdb1c7f85c016a17000125",
};

const app = initializeApp(firebaseConfig);

export function getMessagingInstance() {
  return getMessaging(app);
}


export const requestNotificationPermissionAndGetToken = async () => {
  if (!("Notification" in window)) {
    throw new Error("Trình duyệt không hỗ trợ Notification.");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Bạn chưa cấp quyền nhận thông báo.");
  }

  if (!("serviceWorker" in navigator)) {
    throw new Error("Trình duyệt không hỗ trợ Service Worker.");
  }

  const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    serviceWorkerRegistration: registration,
  });

  if (!token) {
    throw new Error("Không thể lấy được token FCM.");
  }

  return token;
};