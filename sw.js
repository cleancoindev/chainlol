// A simple stale-while-invalidate caching web worker,
// which caches the root (/) path.
// Heavily inspired by https://gist.github.com/fibo/4a1df242b900d4caa217dfc305266847

const CACHE_NAME = 'cache-v1';
const CACHED_URLS = [
  '/',
];

self.addEventListener('install', event => {
  event.waitUntil(async function () {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CACHED_URLS);
  }())
})

self.addEventListener('activate', event => {
  event.waitUntil(async function () {
    const cacheNames = await caches.keys();

    await Promise.all(
      cacheNames.filter((cacheName) => {
        const deleteThisCache = cacheName !== CACHE_NAME;

        return deleteThisCache;
      }).map(cacheName => caches.delete(cacheName)),
    )
  }())
})

// Cache and update with stale-while-revalidate policy.
self.addEventListener('fetch', event => {
  const { request } = event

  // Prevent Chrome Developer Tools error:
  // Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
  //
  // See also https://stackoverflow.com/a/49719964/1217468
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return;
  }

  event.respondWith(async function () {
    const cache = await caches.open(CACHE_NAME);

    const cachedResponsePromise = await cache.match(request);
    const networkResponsePromise = fetch(request);

    if (request.url.startsWith(self.location.origin)) {
      event.waitUntil(async function () {
        const networkResponse = await networkResponsePromise;

        await cache.put(request, networkResponse.clone());
      }());
    }

    return cachedResponsePromise || networkResponsePromise;
  }())
})
