const CACHE_NAME = 'chat-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/copy.html',
    '/manifest.json',
    '/icons/1.png',
    '/socket.io/socket.io.js',
    '/link/clash.html',
    '/link/bot.html',
    // 添加其他你需要缓存的静态资源
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 缓存命中，返回缓存中的内容
                if (response) {
                    return response;
                }
                // 缓存未命中，从网络获取内容
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});