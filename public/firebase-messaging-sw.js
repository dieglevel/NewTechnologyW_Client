importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBuRydKaP0revM7Hy29EXiM3vnpxPWScW8",
    authDomain: "webzalo-d3df7.firebaseapp.com",
    projectId: "webzalo-d3df7",
    storageBucket: "webzalo-d3df7.firebasestorage.app",
    messagingSenderId: "1016001936576",
    appId: "1:1016001936576:web:fdb1c7f85c016a17000125",
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);

//    const title = payload.data.title || 'Thông báo';
//   const options = {
//     body: payload.data.body || '',
//     icon: payload.data.imageUrl || '/firebase-logo.png',
//     image: payload.data.imageUrl || undefined,
//   };

//   self.registration.showNotification(title, options);
// });

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // Mở hoặc focus lại tab của bạn
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientList => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

messaging.onBackgroundMessage(function(payload) {
  // Nếu app đang foreground thì không show notification
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
    const isWindowFocused = clients.some(client => client.focused);
    if (!isWindowFocused) {
      const notificationTitle = payload.data.title || 'Thông báo';
      const notificationOptions = {
        body: payload.data.body || '',
        icon: payload.data.imageUrl || '/firebase-logo.png',
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
    }
  });
});