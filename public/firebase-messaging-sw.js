importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBuRydKaP0revM7Hy29EXiM3vnpxPWScW8",
    authDomain: "webzalo-d3df7.firebaseapp.com",
    projectId: "webzalo-d3df7",
    storageBucket: "webzalo-d3df7.firebaseapp.com",
    messagingSenderId: "1016001936576",
    appId: "1:1016001936576:web:fdb1c7f85c016a17000125",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("ádfasdf",payload.data);
  const title = payload.data.title || 'Thông báo';
  const options = {
    body: payload.data.body || '',
    icon: payload.data.imageUrl || '/firebase-logo.png',
    data: {
      url: 'https://zalo-clone-vip-pro.me/chat/roomId?roomId='+payload.data.roomId || 'https://zalo-clone-vip-pro.me/'
    },
    actions: [
      { action: 'open', title: 'Xem ngay' }
    ]
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/';
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});
