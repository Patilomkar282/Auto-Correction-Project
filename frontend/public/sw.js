self.addEventListener('install', () => {
    console.log('Service Worker installing.');
    // You can add code to cache assets here if needed
});

self.addEventListener('activate', () => {
    console.log('Service Worker activated.');
});

self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'keep-alive') {
        event.waitUntil(fetch('/keep-alive'));
    }
});


