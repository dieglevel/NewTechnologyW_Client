import { initializeApp } from "firebase/app";
import type { Messaging } from "firebase/messaging";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBuRydKaP0revM7Hy29EXiM3vnpxPWScW8",
  authDomain: "webzalo-d3df7.firebaseapp.com",
  projectId: "webzalo-d3df7",
  storageBucket: "webzalo-d3df7.firebasestorage.app",
  messagingSenderId: "1016001936576",
  appId: "1:1016001936576:web:fdb1c7f85c016a17000125",
};

// Khởi tạo Firebase App (luôn an toàn)
const app = initializeApp(firebaseConfig);

// VAPID key từ Firebase Console
const vapidKey = "BAnaaHFh7zuwbpX-8w2MzT_7AehejlObbAuz-_vM0smyO4nCAhMI_NcDTGoj_9pQIcb0d4tLcA-sZuQBdzq6yJI";

// ✅ messaging chỉ được khởi tạo ở client
let messaging: Messaging | null = null;
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  try {
    messaging = getMessaging(app);
  } catch (err) {
    console.warn("Không thể khởi tạo messaging trong môi trường hiện tại:", err);
  }
}

export function requestPermissionAndGetToken() {
  if (!messaging) return Promise.reject("FCM chỉ hoạt động trong trình duyệt");

  console.log("Yêu cầu quyền nhận thông báo...");
  return Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Quyền được cấp, lấy token...");
        return getToken(messaging!, { vapidKey });
      } else {
        throw new Error("User từ chối quyền thông báo.");
      }
    })
    .then((token) => {
      if (token) {
        console.log("Token FCM của bạn:", token);
        return token;
      } else {
        throw new Error("Chưa lấy được token.");
      }
    });
}

export function onMessageListener() {
  if (!messaging) return Promise.reject("FCM chỉ hoạt động trong trình duyệt");

  return new Promise((resolve) => {
    onMessage(messaging!, (payload) => {
      console.log("Thông báo foreground nhận được: ", payload);
      resolve(payload);
    });
  });
}

export function registerServiceWorker() {
  if (typeof window !== "undefined" && 'serviceWorker' in navigator) {
    return navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker đã được đăng ký:', registration);
        return registration;
      })
      .catch((error) => {
        console.error('Đăng ký Service Worker thất bại:', error);
      });
  }
  return Promise.reject('Service Worker không được hỗ trợ hoặc đang chạy ở SSR');
}

export async function getFcmTokenWithSw() {
  if (!messaging) throw new Error("FCM chỉ hoạt động trong trình duyệt");

  try {
    const registration = await registerServiceWorker();
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') throw new Error('Thông báo bị từ chối');

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration as ServiceWorkerRegistration,
    });

    if (!token) throw new Error('Không lấy được token');
    console.log('Token FCM:', token);
    return token;
  } catch (err) {
    console.error('Lỗi lấy token:', err);
    throw err;
  }
}
