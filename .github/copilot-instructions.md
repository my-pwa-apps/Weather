# Weather PWA - Copilot Instructions

## Project Overview
A Progressive Web App (PWA) for weather forecasts with Dutch/English localization, using Microsoft Fluent Design principles. The app uses **no build tools**—pure vanilla HTML, CSS, and JavaScript served directly.

## Architecture

### Core Files
- [app.js](../app.js) - Single-file application (~2400 lines) containing all logic: state management, API calls, UI rendering, translations, and map functionality
- [sw.js](../sw.js) - Service worker for offline caching with network-first strategy for API data, cache-first for static assets
- [styles.css](../styles.css) - Fluent Design System styles using CSS custom properties
- [index.html](../index.html) - Main HTML with inline SVG icons (no icon library dependencies)

### Key Patterns

**State Management**: Single `state` object holds all app state (location, weather data, settings, UI state). Settings persist via `localStorage` with prefixed keys (`weatherLanguage`, `weatherLocation`, etc.).

```javascript
const state = {
    currentLocation: null,
    weatherData: null,
    language: 'nl',  // 'nl' or 'en'
    useCelsius: true,
    useMetric: true,
    // ... more state
};
```

**Translation System**: All UI text uses `t('ui.keyName')` helper accessing the `translations` object with `nl` and `en` keys. Weather codes (WMO) have dedicated translation mappings.

**DOM Element Caching**: All DOM elements are cached in `elements` object at startup—always use `elements.elementId` rather than repeated `document.getElementById()` calls.

## External APIs (No API Keys Required)
- **Weather**: [Open-Meteo API](https://open-meteo.com/) - `api.open-meteo.com/v1/forecast`
- **City Search**: Open-Meteo Geocoding - `geocoding-api.open-meteo.com/v1/search`
- **Reverse Geocode**: BigDataCloud - `api.bigdatacloud.net/data/reverse-geocode-client`
- **Radar**: RainViewer - `api.rainviewer.com/public/weather-maps.json`
- **Map Tiles**: CARTO (light/dark), Esri (satellite), via Leaflet

## Conventions

### CSS
- Use CSS custom properties defined in `:root` (see `--primary`, `--radius-md`, `--shadow-card`, etc.)
- Follow Fluent Design shadows/radii: `--shadow-2/4/8/16`, `--radius-sm/md/lg/xl`
- Use `100dvh` for viewport height (dynamic viewport for mobile)
- Dark mode via `.night-mode` class on `body`

### JavaScript
- Strict mode enabled (`'use strict'`)
- Helper functions for conversions: `convertTemp()`, `convertSpeed()`, `getSpeedUnit()`, etc.
- Debounced search input: `debounce(handleSearchInput, 300)`
- Weather icons use emoji mappings: `weatherIconsDay` and `weatherIconsNight` objects keyed by WMO code

### Service Worker
- Cache versioning: Increment `CACHE_NAME` version (`weather-v36`) when updating cached assets
- **ALWAYS** bump the `CACHE_NAME` version in `sw.js` after making any changes to the codebase
- Widget data endpoint: `widget/weather-data.json` is handled dynamically by service worker

## Development

### Running Locally
```bash
# Python
python -m http.server 8080

# Node.js
npx http-server -p 8080

# Or use VS Code Live Server extension
```

### PWA Icons
Open [icons/generate-icons.html](../icons/generate-icons.html) in browser to generate PNG icons from SVG source.

### Adding New Translations
1. Add keys to both `translations.nl` and `translations.en` in [app.js](../app.js)
2. Use via `t('ui.newKey')` or `t('weather.code')` for weather descriptions
3. Update `updateUILanguage()` function if adding new UI elements

### Modifying Weather Display
- Current weather: `updateWeatherDisplay(data)`
- Hourly forecast: `renderHourlyForecast(data.hourly)`
- Daily forecast: `renderDailyForecast(data.daily)`
- Temperature/unit conversions auto-applied via helper functions
