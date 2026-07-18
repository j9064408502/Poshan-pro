const CACHE_NAME = 'poshanpro-cache-v1';
const urlsToCache = ['/', '/index.html'];

// Install Service Worker and Cache Assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch Assets from Cache or Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('/index.html'));
    })
  );
});

// Handle Background Sync for Offline Data
self.addEventListener('sync', event => {
  if (event.tag === 'sync-family-data') {
    event.waitUntil(
      sendOfflineDataToServer()
    );
  }
});

// Function to send cached data when online
function sendOfflineDataToServer() {
  console.log('Internet recovered! Syncing offline family data...');
  // The indexedDB sync logic or direct firebase sync goes here when network triggers
  return Promise.resolve();
}
