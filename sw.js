/**
 * Service Worker for Weather PWA
 * Handles caching and offline functionality
 */

const CACHE_NAME = 'weather-v49';
const STATIC_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './icons/icon.svg',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// API cache for weather data
const API_CACHE_NAME = 'weather-api-v1';
const API_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_ASSETS))
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME && name !== API_CACHE_NAME)
                        .map((name) => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Store for widget location
let widgetLocationCache = null;

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    if (event.data && event.data.type === 'WIDGET_LOCATION_UPDATE') {
        widgetLocationCache = event.data.location;
    }
});

// Fetch event - serve from cache, then network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle widget data requests with dynamic data
    if (url.pathname.includes('widget/weather-data.json')) {
        event.respondWith(handleWidgetDataRequest());
        return;
    }

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
        // Return offline fallback for HTML requests
        if (request.destination === 'document') {
            return caches.match('./index.html');
        }
        throw error;
    }
}

// Handle widget data request with dynamic weather data
async function handleWidgetDataRequest() {
    try {
        const location = await getStoredLocation();
        if (!location) {
            // Return default data if no location stored
            return new Response(JSON.stringify({
                location: 'Geen locatie',
                icon: '🌡️',
                temperature: '--',
                description: 'Stel een locatie in',
                wind: '-- km/h',
                humidity: '--',
                feelsLike: '--'
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const { latitude, longitude, name } = location;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        const weatherIcons = {
            0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
            45: '🌫️', 48: '🌫️',
            51: '🌦️', 53: '🌦️', 55: '🌧️',
            61: '🌧️', 63: '🌧️', 65: '🌧️',
            71: '🌨️', 73: '🌨️', 75: '❄️',
            80: '🌦️', 81: '🌧️', 82: '⛈️',
            95: '⛈️', 96: '⛈️', 99: '⛈️'
        };
        
        const widgetData = {
            location: name || 'Onbekend',
            icon: weatherIcons[data.current.weather_code] || '🌡️',
            temperature: Math.round(data.current.temperature_2m).toString(),
            description: getWeatherDesc(data.current.weather_code),
            wind: `${Math.round(data.current.wind_speed_10m)} km/h`,
            humidity: Math.round(data.current.relative_humidity_2m).toString(),
            feelsLike: Math.round(data.current.apparent_temperature).toString()
        };
        
        return new Response(JSON.stringify(widgetData), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        // Return cached fallback
        const cached = await caches.match('/widget/weather-data.json');
        if (cached) return cached;
        
        return new Response(JSON.stringify({
            location: 'Fout',
            icon: '⚠️',
            temperature: '--',
            description: 'Kan gegevens niet laden',
            wind: '-- km/h',
            humidity: '--',
            feelsLike: '--'
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
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

// Handle widget requests for Windows 11 widgets
self.addEventListener('widgetclick', (event) => {
    const action = event.action;
    
    if (action === 'open') {
        event.waitUntil(clients.openWindow('/'));
    } else if (action === 'refresh') {
        event.waitUntil(updateWidget());
    }
});

// Handle periodic widget updates
self.addEventListener('widgetinstall', (event) => {
    event.waitUntil(updateWidget());
});

self.addEventListener('widgetresume', (event) => {
    event.waitUntil(updateWidget());
});

// Update widget with current weather data
async function updateWidget() {
    try {
        // Get saved location from IndexedDB or use default
        const location = await getStoredLocation();
        if (!location) return;
        
        const { latitude, longitude, name } = location;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        const weatherIcons = {
            0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
            45: '🌫️', 48: '🌫️',
            51: '🌦️', 53: '🌦️', 55: '🌧️',
            61: '🌧️', 63: '🌧️', 65: '🌧️',
            71: '🌨️', 73: '🌨️', 75: '❄️',
            80: '🌦️', 81: '🌧️', 82: '⛈️',
            95: '⛈️', 96: '⛈️', 99: '⛈️'
        };
        
        const widgetData = {
            location: name || 'Onbekend',
            icon: weatherIcons[data.current.weather_code] || '🌡️',
            temperature: Math.round(data.current.temperature_2m).toString(),
            description: getWeatherDesc(data.current.weather_code),
            wind: `${Math.round(data.current.wind_speed_10m)} km/h`,
            humidity: Math.round(data.current.relative_humidity_2m).toString(),
            feelsLike: Math.round(data.current.apparent_temperature).toString()
        };
        
        // Update widget
        if (self.widgets) {
            const widget = await self.widgets.getByTag('weather-current');
            if (widget) {
                await self.widgets.updateByTag('weather-current', { data: JSON.stringify(widgetData) });
            }
        }
    } catch (error) {
        // Widget update failed
    }
}

function getWeatherDesc(code) {
    const descriptions = {
        0: 'Helder', 1: 'Overwegend helder', 2: 'Gedeeltelijk bewolkt', 3: 'Bewolkt',
        45: 'Mist', 48: 'Rijpmist',
        51: 'Lichte motregen', 53: 'Motregen', 55: 'Dichte motregen',
        61: 'Lichte regen', 63: 'Regen', 65: 'Zware regen',
        71: 'Lichte sneeuw', 73: 'Sneeuw', 75: 'Zware sneeuw',
        80: 'Lichte buien', 81: 'Buien', 82: 'Zware buien',
        95: 'Onweer', 96: 'Onweer met hagel', 99: 'Zwaar onweer'
    };
    return descriptions[code] || 'Onbekend';
}

async function getStoredLocation() {
    // First check if we have a location from message
    if (widgetLocationCache) {
        return widgetLocationCache;
    }
    
    // Fallback: try to extract from cached API requests
    try {
        const cache = await caches.open(API_CACHE_NAME);
        const keys = await cache.keys();
        for (const request of keys) {
            if (request.url.includes('api.open-meteo.com/v1/forecast')) {
                const url = new URL(request.url);
                const lat = url.searchParams.get('latitude');
                const lon = url.searchParams.get('longitude');
                if (lat && lon) {
                    return { latitude: parseFloat(lat), longitude: parseFloat(lon), name: 'Opgeslagen locatie' };
                }
            }
        }
    } catch (e) {
        // Could not get stored location
    }
    return null;
}

// Background sync (for offline actions)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-weather') {
        event.waitUntil(syncWeather());
    }
});

async function syncWeather() {
    await updateWidget();
}
