const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// 安装 Service Worker 并缓存静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 捕获网络请求并尝试从缓存中获取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;  // 如果有缓存，返回缓存的文件
        }
        return fetch(event.request);  // 否则，正常请求网络
      })
  );
});

// 更新 Service Worker 及缓存管理
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
});