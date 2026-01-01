/**
 * Weather PWA
 * A Fluent-design weather app with location detection and precipitation radar
 */

'use strict';

// ========================================
// TRANSLATIONS
// ========================================
const translations = {
    nl: {
        // Weather descriptions
        weather: {
            0: 'Onbewolkt',
            1: 'Overwegend helder',
            2: 'Licht bewolkt',
            3: 'Bewolkt',
            45: 'Mistig',
            48: 'Rijpmist',
            51: 'Lichte motregen',
            53: 'Motregen',
            55: 'Dichte motregen',
            56: 'Lichte ijzel',
            57: 'Dichte ijzel',
            61: 'Lichte regen',
            63: 'Matige regen',
            65: 'Zware regen',
            66: 'Lichte ijsregen',
            67: 'Zware ijsregen',
            71: 'Lichte sneeuw',
            73: 'Matige sneeuw',
            75: 'Zware sneeuw',
            77: 'Sneeuwkorrels',
            80: 'Lichte regenbuien',
            81: 'Matige regenbuien',
            82: 'Zware regenbuien',
            85: 'Lichte sneeuwbuien',
            86: 'Zware sneeuwbuien',
            95: 'Onweer',
            96: 'Onweer met hagel',
            99: 'Zwaar onweer met hagel'
        },
        // UI labels
        ui: {
            appTitle: 'Weer',
            searchPlaceholder: 'Zoek stad...',
            loading: 'Weergegevens ophalen...',
            now: 'Nu',
            hourly: 'Per uur',
            daily: '7 dagen',
            radar: 'Radar',
            wind: 'Wind',
            humidity: 'Vochtigheid',
            feelsLike: 'Gevoels.',
            precipitation: 'Neerslag',
            hourlyForecast: '24-uurs voorspelling',
            dailyForecast: '7-daagse voorspelling',
            precipRadar: 'Neerslagradar',
            speed: 'Snelheid:',
            speedFast: 'Snel',
            speedNormal: 'Normaal',
            speedSlow: 'Langzaam',
            speedVerySlow: 'Zeer langzaam',
            intensity: 'Intensiteit:',
            light: 'Licht',
            moderate: 'Matig',
            heavy: 'Zwaar',
            intense: 'Intens',
            loadingRadar: 'Radar laden...',
            errorTitle: 'Kan weer niet laden',
            errorMessage: 'Controleer uw verbinding en probeer opnieuw.',
            tryAgain: 'Opnieuw proberen',
            install: 'Installeren',
            notNow: 'Niet nu',
            installPrompt: 'Installeer Weer app voor snelle toegang',
            today: 'Vandaag',
            beaufort: 'Bft',
            locationDenied: 'Locatietoegang geweigerd. Schakel locatieservices in of zoek naar een stad.',
            locationUnavailable: 'Locatie niet beschikbaar. Zoek naar een stad.',
            locationTimeout: 'Locatieverzoek time-out. Probeer opnieuw of zoek naar een stad.',
            locationError: 'Kan uw locatie niet detecteren. Zoek naar een stad.',
            cityNotFound: 'Stad niet gevonden. Probeer een andere zoekopdracht.',
            searchError: 'Zoeken mislukt. Controleer uw verbinding.',
            weatherError: 'Kan weergegevens niet ophalen. Probeer opnieuw.',
            noCitiesFound: 'Geen steden gevonden',
            minsAgo: 'm geleden',
            minsAhead: '+${m}m',
            weather: 'Weer',
            timelineNow: 'Nu',
            settings: 'Instellingen',
            settingsLocation: 'Locatie',
            settingsLocationDesc: 'Zoek een stad of gebruik je huidige locatie.',
            useMyLocation: 'Gebruik mijn locatie',
            settingsTimeFormat: 'Tijdnotatie',
            timeFormat24h: '24-uurs',
            timeFormat12h: '12-uurs',
            settingsLanguage: 'Taal'
        },
        // Wind directions
        windDir: {
            N: 'N',
            NNE: 'NNO',
            NE: 'NO',
            ENE: 'ONO',
            E: 'O',
            ESE: 'OZO',
            SE: 'ZO',
            SSE: 'ZZO',
            S: 'Z',
            SSW: 'ZZW',
            SW: 'ZW',
            WSW: 'WZW',
            W: 'W',
            WNW: 'WNW',
            NW: 'NW',
            NNW: 'NNW'
        },
        // Days of week
        days: {
            sunday: 'Zondag',
            monday: 'Maandag',
            tuesday: 'Dinsdag',
            wednesday: 'Woensdag',
            thursday: 'Donderdag',
            friday: 'Vrijdag',
            saturday: 'Zaterdag'
        },
        // Time labels
        time: {
            now: 'Nu',
            today: 'Vandaag'
        }
    },
    en: {
        weather: {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            56: 'Freezing drizzle',
            57: 'Dense freezing drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            66: 'Light freezing rain',
            67: 'Heavy freezing rain',
            71: 'Slight snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with hail',
            99: 'Thunderstorm with heavy hail'
        },
        ui: {
            appTitle: 'Weather',
            searchPlaceholder: 'Search city...',
            loading: 'Fetching weather data...',
            now: 'Now',
            hourly: 'Hourly',
            daily: '7-Day',
            radar: 'Radar',
            wind: 'Wind',
            humidity: 'Humidity',
            feelsLike: 'Feels Like',
            precipitation: 'Precip.',
            hourlyForecast: '24-Hour Forecast',
            dailyForecast: '7-Day Forecast',
            precipRadar: 'Precipitation Radar',
            speed: 'Speed:',
            speedFast: 'Fast',
            speedNormal: 'Normal',
            speedSlow: 'Slow',
            speedVerySlow: 'Very slow',
            intensity: 'Intensity:',
            light: 'Light',
            moderate: 'Moderate',
            heavy: 'Heavy',
            intense: 'Intense',
            loadingRadar: 'Loading radar...',
            errorTitle: 'Unable to load weather',
            errorMessage: 'Please check your connection and try again.',
            tryAgain: 'Try Again',
            install: 'Install',
            notNow: 'Not now',
            installPrompt: 'Install Weather app for quick access',
            today: 'Today',
            beaufort: 'Bft',
            locationDenied: 'Location access denied. Please enable location services or search for a city.',
            locationUnavailable: 'Location unavailable. Please search for a city.',
            locationTimeout: 'Location request timed out. Please try again or search for a city.',
            locationError: 'Unable to detect your location. Please search for a city.',
            cityNotFound: 'City not found. Please try a different search.',
            searchError: 'Search failed. Please check your connection.',
            weatherError: 'Unable to fetch weather data. Please try again.',
            noCitiesFound: 'No cities found',
            minsAgo: 'm ago',
            minsAhead: '+${m}m',
            weather: 'Weather',
            timelineNow: 'Now',
            settings: 'Settings',
            settingsLocation: 'Location',
            settingsLocationDesc: 'Search for a city or use your current location.',
            useMyLocation: 'Use my location',
            settingsTimeFormat: 'Time format',
            timeFormat24h: '24-hour',
            timeFormat12h: '12-hour',
            settingsLanguage: 'Language'
        },
        // Wind directions
        windDir: {
            N: 'N',
            NNE: 'NNE',
            NE: 'NE',
            ENE: 'ENE',
            E: 'E',
            ESE: 'ESE',
            SE: 'SE',
            SSE: 'SSE',
            S: 'S',
            SSW: 'SSW',
            SW: 'SW',
            WSW: 'WSW',
            W: 'W',
            WNW: 'WNW',
            NW: 'NW',
            NNW: 'NNW'
        },
        days: {
            sunday: 'Sunday',
            monday: 'Monday',
            tuesday: 'Tuesday',
            wednesday: 'Wednesday',
            thursday: 'Thursday',
            friday: 'Friday',
            saturday: 'Saturday'
        },
        time: {
            now: 'Now',
            today: 'Today'
        }
    }
};

// Weather code to icon mapping
const weatherIcons = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
    51: '🌧️', 53: '🌧️', 55: '🌧️', 56: '🌧️', 57: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌨️', 67: '🌨️',
    71: '❄️', 73: '❄️', 75: '❄️', 77: '🌨️', 80: '🌦️', 81: '🌦️', 82: '🌧️',
    85: '🌨️', 86: '🌨️', 95: '⛈️', 96: '⛈️', 99: '⛈️'
};

// Beaufort scale thresholds (km/h)
const beaufortThresholds = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];

function getBeaufort(kmh) {
    return beaufortThresholds.findIndex(t => kmh < t);
}

// Wind direction constants
const windDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

function getWindDirection(degrees) {
    return t(`windDir.${windDirections[Math.round(degrees / 22.5) % 16]}`);
}

// Get translation helper
const t = (key) => key.split('.').reduce((obj, k) => obj?.[k], translations[state.language]) || key;

// Get weather description in current language
const getWeatherDescription = (code) => translations[state.language].weather[code] || 'Unknown';

// Debounce helper
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// ========================================
// CONFIGURATION
// ========================================
const config = {
    // Default tab to show: 'current', 'hourly', 'daily', or 'radar'
    defaultTab: 'current',
    // Remember last selected tab between sessions
    rememberTab: true,
    // Default language: 'nl' or 'en'
    defaultLanguage: 'nl',
    // Animation speed in milliseconds (lower = faster)
    // Options: 250 (fast), 500 (normal), 750 (slow), 1000 (very slow)
    animationSpeed: 500
};

// App State
const state = {
    currentLocation: null,
    weatherData: null,
    isLoading: false,
    deferredPrompt: null,
    map: null,
    radarLayers: [],
    currentRadarIndex: 0,
    radarData: null,
    isPlaying: false,
    playInterval: null,
    animationSpeed: config.animationSpeed,
    activeTab: config.defaultTab,
    mapInitialized: false,
    language: config.defaultLanguage,
    use24HourFormat: true,
    selectedHourIndex: null,
    selectedDayIndex: null,
    hourlyData: null
};

// DOM Elements
const elements = {
    locationBtn: document.getElementById('locationBtn'),
    locationSearch: document.getElementById('locationSearch'),
    searchBtn: document.getElementById('searchBtn'),
    searchSuggestions: document.getElementById('searchSuggestions'),
    locationName: document.getElementById('locationName'),
    locationTime: document.getElementById('locationTime'),
    loadingState: document.getElementById('loadingState'),
    loadingText: document.getElementById('loadingText'),
    errorState: document.getElementById('errorState'),
    errorTitle: document.getElementById('errorTitle'),
    errorMessage: document.getElementById('errorMessage'),
    retryBtn: document.getElementById('retryBtn'),
    weatherIconLarge: document.getElementById('weatherIconLarge'),
    currentTemp: document.getElementById('currentTemp'),
    weatherDescription: document.getElementById('weatherDescription'),
    windSpeed: document.getElementById('windSpeed'),
    humidity: document.getElementById('humidity'),
    feelsLike: document.getElementById('feelsLike'),
    precipitation: document.getElementById('precipitation'),
    labelWind: document.getElementById('labelWind'),
    labelHumidity: document.getElementById('labelHumidity'),
    labelFeelsLike: document.getElementById('labelFeelsLike'),
    labelPrecip: document.getElementById('labelPrecip'),
    hourlyForecast: document.getElementById('hourlyForecast'),
    dailyForecast: document.getElementById('dailyForecast'),
    installPrompt: document.getElementById('installPrompt'),
    installText: document.getElementById('installText'),
    installBtn: document.getElementById('installBtn'),
    dismissBtn: document.getElementById('dismissBtn'),
    appTitle: document.getElementById('appTitle'),
    // Tab elements
    tabNavigation: document.getElementById('tabNavigation'),
    tabContentContainer: document.getElementById('tabContentContainer'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabPanels: document.querySelectorAll('.tab-panel'),
    // Section titles
    titleHourly: document.getElementById('titleHourly'),
    titleDaily: document.getElementById('titleDaily'),
    titleRadar: document.getElementById('titleRadar'),
    // Map elements
    precipMap: document.getElementById('precipMap'),
    mapOverlay: document.getElementById('mapOverlay'),
    loadingRadar: document.getElementById('loadingRadar'),
    speedLabel: document.getElementById('speedLabel'),
    speedSelect: document.getElementById('speedSelect'),
    playPauseBtn: document.getElementById('playPauseBtn'),
    playIcon: document.getElementById('playIcon'),
    pauseIcon: document.getElementById('pauseIcon'),
    timelineSlider: document.getElementById('timelineSlider'),
    timelineTime: document.getElementById('timelineTime'),
    // Legend elements
    legendIntensity: document.getElementById('legendIntensity'),
    legendLight: document.getElementById('legendLight'),
    legendModerate: document.getElementById('legendModerate'),
    legendHeavy: document.getElementById('legendHeavy'),
    legendIntense: document.getElementById('legendIntense'),
    legendPast: document.getElementById('legendPast'),
    legendFuture: document.getElementById('legendFuture'),
    // Settings modal
    settingsBtn: document.getElementById('settingsBtn'),
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsBtn: document.getElementById('closeSettingsBtn'),
    useMyLocationBtn: document.getElementById('useMyLocationBtn'),
    settingsTitle: document.getElementById('settingsTitle'),
    settingsLocationTitle: document.getElementById('settingsLocationTitle'),
    settingsLocationDesc: document.getElementById('settingsLocationDesc'),
    useMyLocationText: document.getElementById('useMyLocationText'),
    // Time format settings
    settingsTimeFormatTitle: document.getElementById('settingsTimeFormatTitle'),
    timeFormat24hBtn: document.getElementById('timeFormat24hBtn'),
    timeFormat12hBtn: document.getElementById('timeFormat12hBtn'),
    timeFormat24hText: document.getElementById('timeFormat24hText'),
    timeFormat12hText: document.getElementById('timeFormat12hText'),
    // Language settings
    settingsLanguageTitle: document.getElementById('settingsLanguageTitle'),
    langNlBtn: document.getElementById('langNlBtn'),
    langEnBtn: document.getElementById('langEnBtn')
};

// Initialize the app
async function init() {
    // Load saved language
    const savedLang = localStorage.getItem('weatherLanguage');
    if (savedLang && ['nl', 'en'].includes(savedLang)) {
        state.language = savedLang;
    }
    
    // Load saved time format
    const savedTimeFormat = localStorage.getItem('weatherTimeFormat');
    if (savedTimeFormat !== null) {
        state.use24HourFormat = savedTimeFormat === '24h';
    }
    
    registerServiceWorker();
    setupEventListeners();
    setupTabs();
    updateDateTime();
    updateUILanguage();
    updateTimeFormatButtons();
    updateLanguageButtons();
    setInterval(updateDateTime, 60000);
    
    // Try to load saved location or auto-detect current location
    const savedLocation = localStorage.getItem('weatherLocation');
    if (savedLocation) {
        state.currentLocation = JSON.parse(savedLocation);
        await fetchWeather();
    } else {
        // Default: auto-detect current location
        await detectLocation();
    }
}

// Settings modal functions
function openSettings() {
    elements.settingsModal.classList.remove('hidden');
    if (elements.locationSearch) {
        elements.locationSearch.focus();
    }
}

function closeSettings() {
    elements.settingsModal.classList.add('hidden');
    if (elements.searchSuggestions) {
        elements.searchSuggestions.innerHTML = '';
    }
    if (elements.locationSearch) {
        elements.locationSearch.value = '';
    }
}

// Time format functions
function setTimeFormat(format) {
    state.use24HourFormat = format === '24h';
    localStorage.setItem('weatherTimeFormat', format);
    updateTimeFormatButtons();
    
    // Re-render hourly forecast if available
    if (state.weatherData) {
        renderHourlyForecast(state.weatherData.hourly);
    }
}

function updateTimeFormatButtons() {
    if (elements.timeFormat24hBtn) {
        elements.timeFormat24hBtn.classList.toggle('active', state.use24HourFormat);
    }
    if (elements.timeFormat12hBtn) {
        elements.timeFormat12hBtn.classList.toggle('active', !state.use24HourFormat);
    }
}

// Language button update
function updateLanguageButtons() {
    if (elements.langNlBtn) {
        elements.langNlBtn.classList.toggle('active', state.language === 'nl');
    }
    if (elements.langEnBtn) {
        elements.langEnBtn.classList.toggle('active', state.language === 'en');
    }
}

// ========================================
// LANGUAGE SWITCHING
// ========================================
function switchLanguage(lang) {
    state.language = lang;
    localStorage.setItem('weatherLanguage', lang);
    updateUILanguage();
    updateLanguageButtons();
    
    // Re-render weather data if available
    if (state.weatherData) {
        renderWeather(state.weatherData);
    }
}

function updateUILanguage() {
    const lang = state.language;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title
    document.title = t('ui.appTitle');
    
    // Update app title
    if (elements.appTitle) {
        elements.appTitle.textContent = t('ui.weather');
    }
    
    // Update search placeholder
    if (elements.locationSearch) {
        elements.locationSearch.placeholder = t('ui.searchPlaceholder');
    }
    
    // Update loading text
    if (elements.loadingText) {
        elements.loadingText.textContent = t('ui.loading');
    }
    
    // Update tab labels
    const tabLabels = {
        'current': t('ui.now'),
        'hourly': t('ui.hourly'),
        'daily': t('ui.daily'),
        'radar': t('ui.radar')
    };
    elements.tabBtns.forEach(btn => {
        const tabId = btn.dataset.tab;
        const label = btn.querySelector('.tab-label');
        if (label && tabLabels[tabId]) {
            label.textContent = tabLabels[tabId];
        }
    });
    
    // Update detail labels
    if (elements.labelWind) elements.labelWind.textContent = t('ui.wind');
    if (elements.labelHumidity) elements.labelHumidity.textContent = t('ui.humidity');
    if (elements.labelFeelsLike) elements.labelFeelsLike.textContent = t('ui.feelsLike');
    if (elements.labelPrecip) elements.labelPrecip.textContent = t('ui.precipitation');
    
    // Update section titles
    if (elements.titleHourly) elements.titleHourly.textContent = t('ui.hourlyForecast');
    if (elements.titleDaily) elements.titleDaily.textContent = t('ui.dailyForecast');
    if (elements.titleRadar) elements.titleRadar.textContent = t('ui.precipRadar');
    
    // Update speed control
    if (elements.speedLabel) elements.speedLabel.textContent = t('ui.speed');
    if (elements.speedSelect) {
        const options = elements.speedSelect.options;
        if (options.length >= 4) {
            options[0].textContent = t('ui.speedFast');
            options[1].textContent = t('ui.speedNormal');
            options[2].textContent = t('ui.speedSlow');
            options[3].textContent = t('ui.speedVerySlow');
        }
    }
    
    // Update map overlay text
    if (elements.loadingRadar) elements.loadingRadar.textContent = t('ui.loadingRadar');
    
    // Update legend
    if (elements.legendIntensity) elements.legendIntensity.textContent = t('ui.intensity');
    if (elements.legendLight) elements.legendLight.textContent = t('ui.light');
    if (elements.legendModerate) elements.legendModerate.textContent = t('ui.moderate');
    if (elements.legendHeavy) elements.legendHeavy.textContent = t('ui.heavy');
    if (elements.legendIntense) elements.legendIntense.textContent = t('ui.intense');
    
    // Update timeline legend (keep fixed labels showing time range)
    if (elements.legendPast) elements.legendPast.textContent = state.language === 'nl' ? '-2 uur' : '-2 hrs';
    if (elements.legendFuture) elements.legendFuture.textContent = '+30 min';
    
    // Update error state
    if (elements.errorTitle) elements.errorTitle.textContent = t('ui.errorTitle');
    if (elements.retryBtn) elements.retryBtn.textContent = t('ui.tryAgain');
    
    // Update install prompt
    if (elements.installText) elements.installText.textContent = t('ui.installPrompt');
    if (elements.installBtn) elements.installBtn.textContent = t('ui.install');
    if (elements.dismissBtn) elements.dismissBtn.textContent = t('ui.notNow');
    
    // Update settings modal
    if (elements.settingsTitle) elements.settingsTitle.textContent = t('ui.settings');
    if (elements.settingsLocationTitle) elements.settingsLocationTitle.textContent = t('ui.settingsLocation');
    if (elements.settingsLocationDesc) elements.settingsLocationDesc.textContent = t('ui.settingsLocationDesc');
    if (elements.useMyLocationText) elements.useMyLocationText.textContent = t('ui.useMyLocation');
    
    // Update time format settings
    if (elements.settingsTimeFormatTitle) elements.settingsTimeFormatTitle.textContent = t('ui.settingsTimeFormat');
    if (elements.timeFormat24hText) elements.timeFormat24hText.textContent = t('ui.timeFormat24h');
    if (elements.timeFormat12hText) elements.timeFormat12hText.textContent = t('ui.timeFormat12h');
    
    // Update language settings
    if (elements.settingsLanguageTitle) elements.settingsLanguageTitle.textContent = t('ui.settingsLanguage');
}

// Register Service Worker
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('sw.js');
            console.log('SW registered:', registration);
        } catch (error) {
            console.log('SW registration failed:', error);
        }
    }
}

// ========================================
// TAB NAVIGATION
// ========================================
const tabOrder = ['current', 'hourly', 'daily', 'radar'];

function setupTabs() {
    // Load saved tab preference or use default
    if (config.rememberTab) {
        const savedTab = localStorage.getItem('weatherActiveTab');
        if (savedTab && tabOrder.includes(savedTab)) {
            state.activeTab = savedTab;
        }
    }
    
    // Add click handlers to tab buttons
    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // Setup swipe gestures for tab navigation
    setupSwipeGestures();
}

// Swipe gesture support for mobile tab navigation
function setupSwipeGestures() {
    const container = elements.tabContentContainer;
    if (!container) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let touchStartedOnMap = false;
    const minSwipeDistance = 50;
    const maxVerticalDistance = 100;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        // Check if touch started on the map
        touchStartedOnMap = e.target.closest('#precipMap') !== null;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        // Don't swipe when touch started on the map (allow map panning)
        if (touchStartedOnMap) return;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // Only handle horizontal swipes (not vertical scrolling)
        if (Math.abs(deltaX) < minSwipeDistance || deltaY > maxVerticalDistance) return;
        
        const currentIndex = tabOrder.indexOf(state.activeTab);
        
        if (deltaX < 0 && currentIndex < tabOrder.length - 1) {
            // Swipe left - next tab
            switchTab(tabOrder[currentIndex + 1]);
        } else if (deltaX > 0 && currentIndex > 0) {
            // Swipe right - previous tab
            switchTab(tabOrder[currentIndex - 1]);
        }
    }
}

function switchTab(tabId) {
    state.activeTab = tabId;
    
    // Save preference
    if (config.rememberTab) {
        localStorage.setItem('weatherActiveTab', tabId);
    }
    
    // Update button states
    elements.tabBtns.forEach(btn => {
        const isActive = btn.dataset.tab === tabId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive.toString());
    });
    
    // Update panel visibility
    elements.tabPanels.forEach(panel => {
        const isActive = panel.dataset.tab === tabId;
        panel.classList.toggle('active', isActive);
    });
    
    // Stop radar animation when leaving radar tab
    if (tabId !== 'radar') {
        stopRadarAnimation();
    }
    
    // Initialize map if radar tab is selected and not yet initialized
    if (tabId === 'radar' && state.currentLocation && !state.mapInitialized) {
        setTimeout(() => {
            initMap();
            state.mapInitialized = true;
        }, 100);
    }
    
    // Fix map size, center on location, and autoplay if switching to radar tab
    if (tabId === 'radar' && state.map && state.currentLocation) {
        setTimeout(() => {
            state.map.invalidateSize();
            // Center map on user's location
            state.map.setView([state.currentLocation.latitude, state.currentLocation.longitude], 8);
            // Autoplay radar animation
            if (state.radarLayers.length > 0 && !state.isPlaying) {
                startRadarAnimation();
            }
        }, 100);
    }
}

function showTabContent() {
    elements.loadingState.classList.add('hidden');
    elements.tabNavigation.classList.remove('hidden');
    elements.tabContentContainer.classList.remove('hidden');
    elements.errorState.classList.add('hidden');
    
    // Switch to saved/default tab
    switchTab(state.activeTab);
}

// Setup Event Listeners
function setupEventListeners() {
    // Location button - also detects location
    elements.locationBtn.addEventListener('click', detectLocation);
    
    // Settings modal
    if (elements.settingsBtn) {
        elements.settingsBtn.addEventListener('click', openSettings);
    }
    if (elements.closeSettingsBtn) {
        elements.closeSettingsBtn.addEventListener('click', closeSettings);
    }
    if (elements.settingsModal) {
        elements.settingsModal.addEventListener('click', (e) => {
            if (e.target === elements.settingsModal) {
                closeSettings();
            }
        });
    }
    if (elements.useMyLocationBtn) {
        elements.useMyLocationBtn.addEventListener('click', async () => {
            closeSettings();
            await detectLocation();
        });
    }
    
    // Time format toggle
    if (elements.timeFormat24hBtn) {
        elements.timeFormat24hBtn.addEventListener('click', () => setTimeFormat('24h'));
    }
    if (elements.timeFormat12hBtn) {
        elements.timeFormat12hBtn.addEventListener('click', () => setTimeFormat('12h'));
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.settingsModal && !elements.settingsModal.classList.contains('hidden')) {
            closeSettings();
        }
    });
    
    // Language toggle buttons in settings
    if (elements.langNlBtn) {
        elements.langNlBtn.addEventListener('click', () => switchLanguage('nl'));
    }
    if (elements.langEnBtn) {
        elements.langEnBtn.addEventListener('click', () => switchLanguage('en'));
    }
    
    // Search functionality
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', handleSearch);
    }
    if (elements.locationSearch) {
        elements.locationSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
        elements.locationSearch.addEventListener('input', debounce(handleSearchInput, 300));
    }
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container') && !e.target.closest('.search-suggestions')) {
            if (elements.searchSuggestions) {
                elements.searchSuggestions.innerHTML = '';
            }
        }
    });
    
    // Retry button
    elements.retryBtn.addEventListener('click', () => {
        if (state.currentLocation) {
            fetchWeather();
        } else {
            detectLocation();
        }
    });
    
    // Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        state.deferredPrompt = e;
        setTimeout(() => {
            elements.installPrompt.classList.remove('hidden');
        }, 3000);
    });
    
    elements.installBtn.addEventListener('click', async () => {
        if (state.deferredPrompt) {
            state.deferredPrompt.prompt();
            const result = await state.deferredPrompt.userChoice;
            console.log('Install prompt result:', result);
            state.deferredPrompt = null;
        }
        elements.installPrompt.classList.add('hidden');
    });
    
    elements.dismissBtn.addEventListener('click', () => {
        elements.installPrompt.classList.add('hidden');
    });
    
    // Animation speed control
    if (elements.speedSelect) {
        // Load saved speed
        const savedSpeed = localStorage.getItem('radarAnimationSpeed');
        if (savedSpeed) {
            state.animationSpeed = parseInt(savedSpeed);
            elements.speedSelect.value = savedSpeed;
        }
        
        elements.speedSelect.addEventListener('change', (e) => {
            setAnimationSpeed(parseInt(e.target.value));
        });
    }
    
    elements.playPauseBtn.addEventListener('click', toggleRadarAnimation);
    
    elements.timelineSlider.addEventListener('input', (e) => {
        stopRadarAnimation();
        state.currentRadarIndex = parseInt(e.target.value);
        updateRadarFrame();
    });
}

// Detect user location
async function detectLocation() {
    showLoading();
    
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            });
        });
        
        const { latitude, longitude } = position.coords;
        
        // Reverse geocode to get city name
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1&format=json`;
        
        try {
            // Use reverse geocoding
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await response.json();
            
            state.currentLocation = {
                name: data.address.city || data.address.town || data.address.village || data.address.municipality || 'Your Location',
                country: data.address.country || '',
                latitude,
                longitude
            };
        } catch {
            state.currentLocation = {
                name: 'Your Location',
                country: '',
                latitude,
                longitude
            };
        }
        
        localStorage.setItem('weatherLocation', JSON.stringify(state.currentLocation));
        await fetchWeather();
        
    } catch (error) {
        console.error('Geolocation error:', error);
        let message = 'Unable to detect your location. Please search for a city.';
        if (error.code === 1) {
            message = 'Location access denied. Please enable location services or search for a city.';
        } else if (error.code === 2) {
            message = 'Location unavailable. Please search for a city.';
        } else if (error.code === 3) {
            message = 'Location request timed out. Please try again or search for a city.';
        }
        showError(message);
    }
}

// Handle search input for suggestions
async function handleSearchInput() {
    if (!elements.locationSearch || !elements.searchSuggestions) return;
    const query = elements.locationSearch.value.trim();
    
    if (query.length < 2) {
        elements.searchSuggestions.innerHTML = '';
        return;
    }
    
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            renderSuggestions(data.results);
        } else {
            elements.searchSuggestions.innerHTML = '<div class="suggestion-item"><span class="suggestion-text">No cities found</span></div>';
        }
    } catch (error) {
        console.error('Search error:', error);
    }
}

// Render search suggestions
function renderSuggestions(results) {
    elements.searchSuggestions.innerHTML = results.map(result => `
        <div class="suggestion-item" data-lat="${result.latitude}" data-lon="${result.longitude}" data-name="${result.name}" data-country="${result.country || ''}">
            <span class="suggestion-icon">📍</span>
            <div class="suggestion-text">
                <div class="suggestion-city">${result.name}</div>
                <div class="suggestion-country">${[result.admin1, result.country].filter(Boolean).join(', ')}</div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    elements.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const lat = parseFloat(item.dataset.lat);
            const lon = parseFloat(item.dataset.lon);
            const name = item.dataset.name;
            const country = item.dataset.country;
            
            state.currentLocation = {
                name,
                country,
                latitude: lat,
                longitude: lon
            };
            
            localStorage.setItem('weatherLocation', JSON.stringify(state.currentLocation));
            elements.searchSuggestions.innerHTML = '';
            elements.locationSearch.value = '';
            closeSettings();
            fetchWeather();
        });
    });
}

// Handle search button click
async function handleSearch() {
    if (!elements.locationSearch) return;
    const query = elements.locationSearch.value.trim();
    if (!query) return;
    
    showLoading();
    closeSettings();
    
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const result = data.results[0];
            state.currentLocation = {
                name: result.name,
                country: result.country || '',
                latitude: result.latitude,
                longitude: result.longitude
            };
            
            localStorage.setItem('weatherLocation', JSON.stringify(state.currentLocation));
            if (elements.searchSuggestions) elements.searchSuggestions.innerHTML = '';
            if (elements.locationSearch) elements.locationSearch.value = '';
            await fetchWeather();
        } else {
            showError('City not found. Please try a different search.');
        }
    } catch (error) {
        console.error('Search error:', error);
        showError('Search failed. Please check your connection and try again.');
    }
}

// Fetch weather data
async function fetchWeather() {
    if (!state.currentLocation) return;
    
    showLoading();
    
    const { latitude, longitude, name, country } = state.currentLocation;
    elements.locationName.textContent = country ? `${name}, ${country}` : name;
    
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,precipitation&hourly=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Weather data unavailable');
        }
        
        const data = await response.json();
        state.weatherData = data;
        
        renderWeather(data);
        updateBackground(data.current.weather_code, data.current.temperature_2m);
        
    } catch (error) {
        console.error('Weather fetch error:', error);
        showError(t('ui.weatherError'));
    }
}

// Render weather data
function renderWeather(data) {
    const current = data.current;
    const weatherIcon = weatherIcons[current.weather_code] || '🌡️';
    const weatherDesc = getWeatherDescription(current.weather_code);
    const windKmh = Math.round(current.wind_speed_10m);
    const beaufort = getBeaufort(windKmh);
    const windDir = getWindDirection(current.wind_direction_10m);
    
    // Reset selected hour
    state.selectedHourIndex = null;
    
    // Current weather
    elements.weatherIconLarge.textContent = weatherIcon;
    elements.currentTemp.textContent = Math.round(current.temperature_2m);
    elements.weatherDescription.textContent = weatherDesc;
    elements.windSpeed.innerHTML = `${windDir} ${windKmh} km/h<br><small>${t('ui.beaufort')} ${beaufort}</small>`;
    elements.humidity.textContent = `${current.relative_humidity_2m}%`;
    elements.feelsLike.textContent = `${Math.round(current.apparent_temperature)}°C`;
    elements.precipitation.textContent = `${current.precipitation} mm`;
    
    // Hourly forecast
    renderHourlyForecast(data.hourly);
    
    // Daily forecast
    renderDailyForecast(data.daily);
    
    // Show tab interface
    showTabContent();
    
    // Reset map initialization flag when location changes
    state.mapInitialized = false;
    
    // If radar tab is active, initialize the map
    if (state.activeTab === 'radar') {
        setTimeout(() => {
            initMap();
            state.mapInitialized = true;
        }, 100);
    }
}

// Render hourly forecast
function renderHourlyForecast(hourly) {
    const now = new Date();
    
    // Get next 24 hours
    const startIndex = hourly.time.findIndex(time => {
        const hourTime = new Date(time);
        return hourTime >= now;
    });
    
    const hours = hourly.time.slice(startIndex, startIndex + 24);
    const temps = hourly.temperature_2m.slice(startIndex, startIndex + 24);
    const codes = hourly.weather_code.slice(startIndex, startIndex + 24);
    
    // Store hourly data for detail view
    state.hourlyData = { hours, temps, codes, startIndex };
    
    elements.hourlyForecast.innerHTML = hours.map((time, index) => {
        const date = new Date(time);
        const hour = date.getHours();
        const isNow = index === 0;
        const icon = weatherIcons[codes[index]] || '🌡️';
        const isSelected = state.selectedHourIndex === index;
        
        return `
            <div class="hourly-item ${isNow ? 'now' : ''} ${isSelected ? 'selected' : ''}" data-index="${index}">
                <div class="hourly-time">${isNow ? t('time.now') : formatHour(hour)}</div>
                <div class="hourly-icon">${icon}</div>
                <div class="hourly-temp">${Math.round(temps[index])}°</div>
            </div>
        `;
    }).join('');
    
    // Add click handlers to hourly items
    elements.hourlyForecast.querySelectorAll('.hourly-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            selectHourlyItem(index);
        });
    });
}

// Select an hourly item and show details
function selectHourlyItem(index) {
    state.selectedHourIndex = index;
    
    // Update selected state visually
    elements.hourlyForecast.querySelectorAll('.hourly-item').forEach((item, i) => {
        item.classList.toggle('selected', i === index);
    });
    
    // Show details in the current weather section (switch to current tab)
    if (state.hourlyData && state.weatherData) {
        const { hours, startIndex } = state.hourlyData;
        const hourly = state.weatherData.hourly;
        const dataIndex = startIndex + index;
        
        const date = new Date(hours[index]);
        const weatherCode = hourly.weather_code[dataIndex];
        const temp = hourly.temperature_2m[dataIndex];
        const humidity = hourly.relative_humidity_2m[dataIndex];
        const feelsLike = hourly.apparent_temperature[dataIndex];
        const windSpeed = hourly.wind_speed_10m[dataIndex];
        const windDir = hourly.wind_direction_10m[dataIndex];
        const precip = hourly.precipitation[dataIndex];
        
        const icon = weatherIcons[weatherCode] || '🌡️';
        const desc = getWeatherDescription(weatherCode);
        const beaufort = getBeaufort(Math.round(windSpeed));
        const windDirText = getWindDirection(windDir);
        
        // Switch to current tab to show details
        switchTab('current');
        
        // Update current weather display with selected hour data
        elements.weatherIconLarge.textContent = icon;
        elements.currentTemp.textContent = Math.round(temp);
        elements.weatherDescription.textContent = `${formatHour(date.getHours())} - ${desc}`;
        
        // Update detail cards
        elements.windSpeed.innerHTML = `${windDirText} ${Math.round(windSpeed)} km/h<br><small>${t('ui.beaufort')} ${beaufort}</small>`;
        elements.humidity.textContent = `${humidity}%`;
        elements.feelsLike.textContent = `${Math.round(feelsLike)}°C`;
        elements.precipitation.textContent = `${precip} mm`;
    }
}

// Render daily forecast
function renderDailyForecast(daily) {
    elements.dailyForecast.innerHTML = daily.time.slice(0, 7).map((time, index) => {
        const date = new Date(time);
        let dayName;
        if (index === 0) {
            dayName = t('time.today');
        } else {
            const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            dayName = t(`days.${dayKeys[date.getDay()]}`);
        }
        const icon = weatherIcons[daily.weather_code[index]] || '🌡️';
        const isSelected = state.selectedDayIndex === index;

        return `
            <div class="daily-item ${isSelected ? 'selected' : ''}" data-index="${index}">
                <div class="daily-day">${dayName}</div>
                <div class="daily-icon">${icon}</div>
                <div class="daily-temps">
                    <span class="daily-high">${Math.round(daily.temperature_2m_max[index])}°</span>
                    <span class="daily-low">${Math.round(daily.temperature_2m_min[index])}°</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers to daily items
    elements.dailyForecast.querySelectorAll('.daily-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            selectDailyItem(index);
        });
    });
}

// Select a daily item and show details
function selectDailyItem(index) {
    state.selectedDayIndex = index;
    
    // Update selected state visually
    elements.dailyForecast.querySelectorAll('.daily-item').forEach((item, i) => {
        item.classList.toggle('selected', i === index);
    });
    
    // Show details in the current weather section
    if (state.weatherData && state.weatherData.daily) {
        const daily = state.weatherData.daily;
        const weatherCode = daily.weather_code[index];
        const maxTemp = daily.temperature_2m_max[index];
        const minTemp = daily.temperature_2m_min[index];
        const precipSum = daily.precipitation_sum[index];
        const windMax = daily.wind_speed_10m_max[index];
        const windDir = daily.wind_direction_10m_dominant[index];
        
        const icon = weatherIcons[weatherCode] || '🌡️';
        const desc = getWeatherDescription(weatherCode);
        const beaufort = getBeaufort(Math.round(windMax));
        const windDirText = getWindDirection(windDir);
        
        // Get day name for display
        const date = new Date(daily.time[index]);
        let dayName;
        if (index === 0) {
            dayName = t('time.today');
        } else {
            const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            dayName = t(`days.${dayKeys[date.getDay()]}`);
        }
        
        // Switch to current tab to show details
        switchTab('current');
        
        // Update current weather display with selected day data
        elements.weatherIconLarge.textContent = icon;
        elements.currentTemp.textContent = `${Math.round(maxTemp)}/${Math.round(minTemp)}`;
        elements.weatherDescription.textContent = `${dayName} - ${desc}`;
        
        // Update detail cards
        elements.windSpeed.innerHTML = `${windDirText} ${Math.round(windMax)} km/h<br><small>${t('ui.beaufort')} ${beaufort}</small>`;
        elements.humidity.textContent = '-';
        elements.feelsLike.textContent = '-';
        elements.precipitation.textContent = `${precipSum} mm`;
    }
}

// Format hour based on time format setting
function formatHour(hour) {
    if (state.use24HourFormat) {
        return `${hour}:00`;
    }
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
}

// Update background based on weather
function updateBackground(weatherCode, temperature) {
    document.body.classList.remove('sunny', 'cloudy', 'rainy', 'night-mode');
    
    const now = new Date();
    const hour = now.getHours();
    
    // Night mode (before 6am or after 8pm)
    if (hour < 6 || hour >= 20) {
        document.body.classList.add('night-mode');
        return;
    }
    
    // Weather-based backgrounds
    if (weatherCode === 0 || weatherCode === 1) {
        document.body.classList.add('sunny');
    } else if ([45, 48, 2, 3].includes(weatherCode)) {
        document.body.classList.add('cloudy');
    } else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weatherCode)) {
        document.body.classList.add('rainy');
    }
}

// Update date/time display
function updateDateTime() {
    if (!elements.locationTime) return;
    const now = new Date();
    const options = { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    };
    elements.locationTime.textContent = now.toLocaleDateString('en-US', options);
}

// Show loading state
function showLoading() {
    elements.loadingState.classList.remove('hidden');
    elements.tabNavigation.classList.add('hidden');
    elements.tabContentContainer.classList.add('hidden');
    elements.errorState.classList.add('hidden');
    
    // Stop any radar animation
    stopRadarAnimation();
}

// Show error state
function showError(message) {
    elements.loadingState.classList.add('hidden');
    elements.tabNavigation.classList.add('hidden');
    elements.tabContentContainer.classList.add('hidden');
    elements.errorState.classList.remove('hidden');
    elements.errorMessage.textContent = message;
    elements.locationName.textContent = 'Weather';
}

// ========================================
// PRECIPITATION MAP FUNCTIONS
// ========================================

// Initialize the map
function initMap() {
    if (state.map) {
        state.map.remove();
    }
    
    const { latitude, longitude } = state.currentLocation;
    
    // Create map
    state.map = L.map('precipMap', {
        center: [latitude, longitude],
        zoom: 8,
        zoomControl: true,
        attributionControl: true
    });
    
    // Add base tile layer (dark theme for better radar visibility)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(state.map);
    
    // Add location marker
    const locationIcon = L.divIcon({
        html: '<div style="background: #667eea; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
        iconSize: [16, 16],
        className: 'location-marker'
    });
    
    L.marker([latitude, longitude], { icon: locationIcon })
        .addTo(state.map)
        .bindPopup(`<b>${state.currentLocation.name}</b>`);
    
    // Load radar data
    loadRadarData();
}

// Load radar data from RainViewer API
async function loadRadarData() {
    elements.mapOverlay.classList.remove('hidden');
    
    try {
        const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        const data = await response.json();
        
        state.radarData = data;
        
        // Clear existing radar layers
        state.radarLayers.forEach(item => {
            if (state.map.hasLayer(item.layer)) {
                state.map.removeLayer(item.layer);
            }
        });
        state.radarLayers = [];
        
        // Combine past and nowcast (forecast) frames into one timeline
        const pastFrames = data.radar.past || [];
        const nowcastFrames = data.radar.nowcast || [];
        
        // Combine frames: past (oldest to newest) + nowcast (present to future)
        const allFrames = [...pastFrames, ...nowcastFrames];
        
        if (allFrames.length === 0) {
            console.log('No radar frames available');
            elements.mapOverlay.classList.add('hidden');
            return;
        }
        
        // Find the index of the frame closest to now
        const now = Math.floor(Date.now() / 1000);
        let nowIndex = 0;
        let minDiff = Infinity;
        
        // Create layers for each frame
        allFrames.forEach((frame, index) => {
            const layer = L.tileLayer(
                `${data.host}${frame.path}/256/{z}/{x}/{y}/2/1_1.png`,
                {
                    opacity: 0,
                    zIndex: 5
                }
            );
            state.radarLayers.push({
                layer: layer,
                time: frame.time,
                isForecast: index >= pastFrames.length
            });
            
            // Find closest frame to now
            const diff = Math.abs(frame.time - now);
            if (diff < minDiff) {
                minDiff = diff;
                nowIndex = index;
            }
        });
        
        // Store the now index for reference
        state.radarNowIndex = nowIndex;
        
        // Update slider range
        elements.timelineSlider.max = state.radarLayers.length - 1;
        elements.timelineSlider.value = nowIndex;
        state.currentRadarIndex = nowIndex;
        
        // Add all layers to map (hidden initially)
        state.radarLayers.forEach(item => {
            item.layer.addTo(state.map);
        });
        
        // Show current frame
        updateRadarFrame();
        
        elements.mapOverlay.classList.add('hidden');
        
        // Autoplay radar animation
        if (!state.isPlaying) {
            startRadarAnimation();
        }
        
    } catch (error) {
        console.error('Error loading radar data:', error);
        elements.mapOverlay.classList.add('hidden');
    }
}

// Update the visible radar frame
function updateRadarFrame() {
    if (state.radarLayers.length === 0) return;
    
    // Hide all layers
    state.radarLayers.forEach((item, index) => {
        item.layer.setOpacity(index === state.currentRadarIndex ? 0.7 : 0);
    });
    
    // Update timeline display
    const currentFrame = state.radarLayers[state.currentRadarIndex];
    if (currentFrame) {
        const time = new Date(currentFrame.time * 1000);
        const now = new Date();
        const diffMinutes = Math.round((time - now) / 60000);
        
        if (Math.abs(diffMinutes) < 5) {
            elements.timelineTime.textContent = t('ui.timelineNow');
        } else if (diffMinutes < 0) {
            elements.timelineTime.textContent = `${Math.abs(diffMinutes)} ${t('ui.minsAgo')}`;
        } else {
            elements.timelineTime.textContent = `+${diffMinutes}m`;
        }
    }
    
    // Update slider
    elements.timelineSlider.value = state.currentRadarIndex;
}

// Toggle radar animation
function toggleRadarAnimation() {
    if (state.isPlaying) {
        stopRadarAnimation();
    } else {
        startRadarAnimation();
    }
}

// Start radar animation
function startRadarAnimation() {
    if (state.radarLayers.length === 0) return;
    
    state.isPlaying = true;
    elements.playIcon.classList.add('hidden');
    elements.pauseIcon.classList.remove('hidden');
    
    state.playInterval = setInterval(() => {
        state.currentRadarIndex = (state.currentRadarIndex + 1) % state.radarLayers.length;
        updateRadarFrame();
    }, state.animationSpeed);
}

// Change animation speed
function setAnimationSpeed(speed) {
    state.animationSpeed = speed;
    localStorage.setItem('radarAnimationSpeed', speed);
    
    // If currently playing, restart with new speed
    if (state.isPlaying) {
        stopRadarAnimation();
        startRadarAnimation();
    }
}

// Stop radar animation
function stopRadarAnimation() {
    state.isPlaying = false;
    elements.playIcon.classList.remove('hidden');
    elements.pauseIcon.classList.add('hidden');
    
    if (state.playInterval) {
        clearInterval(state.playInterval);
        state.playInterval = null;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
