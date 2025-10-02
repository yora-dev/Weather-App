# Weather App - Frontend Mentor Solution

A responsive, mobile-first weather web app built as a Frontend Mentor challenge solution. The app shows current weather, hourly and daily forecasts, supports unit toggles (Metric/Imperial), and provides a searchable interface for locations. It uses the Open-Meteo API for weather and geocoding for location lookup.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture & data flow](#architecture--data-flow)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install & run locally](#install--run-locally)
  - [Build & serve](#build--serve)
- [Configuration & API details](#configuration--api-details)
- [Usage guide](#usage-guide)
- [Development notes](#development-notes)
  - [Project structure](#project-structure)
  - [Coding conventions](#coding-conventions)
  - [Testing & linting](#testing--linting)
- [Accessibility & performance](#accessibility--performance)
- [Deployment](#deployment)
- [Future improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

This project implements a progressive, single-page frontend that:

- Lets users search for locations (city names) and view current conditions.
- Shows a 7-day forecast with highs/lows and selectable days.
- Displays hourly forecasts for the selected day.
- Provides unit toggles for temperature, wind and precipitation.
- Is responsive, optimized for mobile-first layouts, and accessible.

Default city on first load: Addis Ababa, Ethiopia(My Country).

---

## Features

- Search by city name with simple geocoding fallback.
- Current weather card: temperature, condition icon, location, timestamp.
- Additional metrics: feels-like, humidity, wind speed, precipitation.
- 7-day forecast summary with high/low and icons.
- Hourly forecast panel for selected day (interactive).
- Unit switch: Metric (°C, km/h, mm) ↔ Imperial (°F, mph, in).
- Mobile-first responsive layout with breakpoints for tablets and desktop.
- Minimal dependencies; primarily vanilla HTML, CSS, and JS.

---

## Tech stack

- Plain HTML5, CSS3 (Flexbox & Grid)
- Modern JavaScript (ES6+)
- Fetch API for network requests
- Open-Meteo (weather) and optional geocoding providers
- No build tools required (static site), but optional tools recommended for development

---

## Architecture & data flow

1. User submits a location or app loads default coordinates.
2. App resolves coordinates via lightweight geocoding (city → lat/lon).
3. The app requests weather data (current, hourly, daily) from Open-Meteo.
4. Responses are parsed and normalized into a UI-friendly model.
5. UI components (current card, day selector, hourly list) render from model.
6. Unit conversions are applied in the UI layer; original values preserved.

State is maintained client-side (selected day, unit mode, last search).

---

## Getting started

### Prerequisites

- Modern browser (Chrome, Firefox, Edge, Safari) with ES6 support.
- Optional: Node.js + npm if you want to run dev tooling or serve via an npm server.

### Install & run locally

To open locally:

Option A — Open directly

1. Clone the repo:
   git clone https://github.com/yora-dev/weather-app.git
2. Open index.html in your browser.

Option B — Simple local server (recommended)

- Using VS Code Live Server extension — click "Go Live".
- Or using Python:
  - Python 3.x: python -m http.server 5500
  - Open http://localhost:5500

Option C — Node-based static server

- npm i -g serve
- serve .

### Build & serve

There is no build step by default. If you add toolchain (bundler, minifier), include instructions here for npm scripts (build, start).

---

## Configuration & API details

This app expects to fetch weather and geocoding data from public endpoints. Default implementation uses Open-Meteo (no API key).

Key endpoints (examples):

- Open-Meteo weather: https://api.open-meteo.com/v1/forecast
  - Important query params: latitude, longitude, hourly (temperature_2m, precipitation, windspeed_10m, weathercode, etc.), daily parameters (temperature_2m_max, temperature_2m_min), timezone.
- Geocoding: use Open-Meteo geocoding or another free service to convert city → coordinates.

Example request:
https://api.open-meteo.com/v1/forecast?latitude=9.03&longitude=38.74&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto

Local configuration:

- If you swap to a geocoding provider that requires an API key, store keys in environment variables or a .env during development (do not commit keys).

---

## Usage guide

### Live demo

- Live site: https://yordanos-weather-app.vercel.app/

- Search: Type a city name in the search bar; press Enter or select a suggestion.
- Day selection: Click a day in the 7-day list to view its hourly forecast.
- Units: Toggle the metric/imperial switch. The UI converts values in-place; underlying data remains unchanged.
- Keyboard accessibility: use Tab to focus controls and Enter/Space to activate.

Tips:

- Default behavior falls back to a preset city on network errors.
- Times respect the timezone returned by the API.

---

---

## Future improvements

- Modularize code: separate API, UI, and state modules; migrate to a bundler or framework if project grows.
- Add robust caching and offline support (service worker) for quick load and offline snapshots.
- Integrate location autocomplete with debounce & rate limiting.
- Improve UX: animations for day transitions, better iconography, localized units/time formats.
- Persist user preferences (units, last city) to localStorage.

---

## Contributing

- Fork the repo, create a feature branch, and open a PR.
- Keep changes focused and document behavior in the PR description.
- Run linters and formatters before submitting.

---

## Screenshots

![Desktop layout — main screen](./assets/screenshots/preview.jpg)

## Author

Yordanos Shanbel

- GitHub: @yora-dev
- Frontend: @yora-dev
- Discord: @yordanos01

---

## Acknowledgments

- Frontend Mentor — challenge design & brief.
- Open-Meteo — free weather API used for forecasts.

---
