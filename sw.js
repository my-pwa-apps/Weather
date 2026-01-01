/**
 * Service Worker for Weather PWA
 * Handles caching and offline functionality
 */

const CACHE_NAME = 'weather-v11';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon.svg',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// API cache for weather data
const API_CACHE_NAME = 'weather-api-v1';
const API_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME && name !== API_CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, then network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle API requests with network-first strategy
    if (url.hostname.includes('api.open-meteo.com') || 
        url.hostname.includes('geocoding-api.open-meteo.com') ||
        url.hostname.includes('nominatim.openstreetmap.org') ||
        url.hostname.includes('api.rainviewer.com')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Handle map tiles with cache-first (they don't change often)
    if (url.hostname.includes('basemaps.cartocdn.com') ||
        url.hostname.includes('tilecache.rainviewer.com')) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Handle Google Fonts and Leaflet CDN
    if (url.hostname.includes('fonts.googleapis.com') || 
        url.hostname.includes('fonts.gstatic.com') ||
        url.hostname.includes('unpkg.com')) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Handle static assets with cache-first strategy
    if (request.destination === 'document' ||
        request.destination === 'script' ||
        request.destination === 'style' ||
        request.destination === 'image') {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Default: network first
    event.respondWith(networkFirst(request));
});

// Cache-first strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network request failed:', error);
        // Return offline fallback for HTML requests
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        throw error;
    }
}

// Network-first strategy (for API calls)
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            // Cache the API response
            const cache = await caches.open(API_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network request failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Handle push notifications (future feature)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icons/icon-192.png',
            badge: '/icons/icon-72.png',
            vibrate: [100, 50, 100],
            data: {
                url: data.url || '/'
            }
        };
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

// Background sync (for offline actions)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-weather') {
        event.waitUntil(syncWeather());
    }
});

async function syncWeather() {
    // This would sync any pending weather data requests
    console.log('[SW] Background sync triggered');
}
