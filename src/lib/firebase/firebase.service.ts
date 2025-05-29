import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyBuRydKaP0revM7Hy29EXiM3vnpxPWScW8",
  authDomain: "webzalo-d3df7.firebaseapp.com",
  projectId: "webzalo-d3df7",
  storageBucket: "webzalo-d3df7.firebasestorage.app",
  messagingSenderId: "1016001936576",
  appId: "1:1016001936576:web:fdb1c7f85c016a17000125",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };


// import { getApp, getApps, initializeApp } from "firebase/app";
// import type { Messaging } from "firebase/messaging";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// // Firebase config


// // VAPID key
// const vapidKey = "BAnaaHFh7zuwbpX-8w2MzT_7AehejlObbAuz-_vM0smyO4nCAhMI_NcDTGoj_9pQIcb0d4tLcA-sZuQBdzq6yJI";


// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// // Chỉ khởi tạo messaging nếu đang ở trình duyệt
// const messaging = typeof window !== 'undefined' ? getMessaging(app) : null

// export { app, messaging }

// export function getMessagingInstance() {
//   if (!messaging) throw new Error("FCM chỉ hoạt động trong trình duyệt");
//   return messaging;
// }
// // ✅ Chỉ export hàm, không gọi luôn
// export function getMessagingInstance2() {
//   return getMessaging(app);
// }

// // ✅ Hàm xin quyền và lấy token — chỉ gọi khi cần
// export async function requestPermissionAndGetToken() {
//   if (!messaging) throw new Error("FCM chỉ hoạt động trong trình duyệt");

//   const permission = await Notification.requestPermission();
//   if (permission !== "granted") {
//     throw new Error("Người dùng từ chối nhận thông báo");
//   }

//   const token = await getToken(messaging, { vapidKey });
//   if (!token) throw new Error("Không lấy được token FCM");
//   console.log("Token FCM:", token);
//   return token;
// }

// export function onMessageListener() {
//   if (!messaging) return Promise.reject("FCM chỉ hoạt động trong trình duyệt");

//   return new Promise((resolve) => {
//     onMessage(messaging!, (payload) => {
//       console.log("Thông báo foreground nhận được:", payload);
//       resolve(payload);
//     });
//   });
// }

// export function registerServiceWorker() {
//   if (typeof window !== "undefined" && 'serviceWorker' in navigator) {
//     return navigator.serviceWorker
//       .register('/firebase-messaging-sw.js')
//       .then((registration) => {
//         console.log('Service Worker đã đăng ký:', registration);
//         return registration;
//       })
//       .catch((error) => {
//         console.error('Đăng ký Service Worker thất bại:', error);
//       });
//   }
//   return Promise.reject('Service Worker không được hỗ trợ hoặc đang ở SSR');
// }

// // ✅ Chỉ gọi khi cần lấy token có đăng ký SW
// export async function getFCMToken(): Promise<string | null> {
//   if (typeof window === "undefined" || typeof navigator === "undefined") return null;

//   try {
//     const messaging = getMessagingInstance();
//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") return null;

//     const registration = await registerServiceWorker();
//     if (!registration) return null;

//     const token = await getToken(messaging, {
//       vapidKey,
//       serviceWorkerRegistration: registration,
//     });

//     return token || null;
//   } catch {
//     return null;
//   }
// }
// // getFcmTokenWithSw
// // getFCMToken
// export async function getFcmTokenWithSw() {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === 'granted' && messaging) {
//       const token = await getToken(messaging, {
//         vapidKey,
//       });
//       console.log('✅ FCM Token:', token);
//       return token;
//     } else {
//       console.warn('Permission not granted or messaging unavailable');
//     }
//   } catch (err) {
//     console.error('❌ Không lấy được FCM token', err);
//   }
// }