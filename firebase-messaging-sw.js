// firebase-messaging-sw.js
// This service worker is required by Firebase Cloud Messaging for background push notifications.
// It must be served from the root of your domain.

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDEH_ymExHOwVG8EcmP63Mb0zgrBdhxZdc",
  authDomain: "edhkl-activation.firebaseapp.com",
  projectId: "edhkl-activation",
  storageBucket: "edhkl-activation.firebasestorage.app",
  messagingSenderId: "235775301318",
  appId: "1:235775301318:web:6458f492aba1e4e35569c7",
});

const messaging = firebase.messaging();

// Handle background messages (when app is minimised or closed)
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message received:", payload);

  const { title, body } = payload.notification || {};
  const notificationTitle = title || "🚨 ED Activate Alert";
  const notificationOptions = {
    body: body || "A new emergency case has been activated.",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    requireInteraction: true,
    tag: "ed-alert",
    vibrate: [200, 100, 200],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// On notification click — bring the app into focus
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
