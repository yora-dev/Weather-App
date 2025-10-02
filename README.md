# Weather App - Frontend Mentor Solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49).  
It’s a fully responsive web app that displays current weather, daily and hourly forecasts, and allows users to switch units and days.

---

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [What I Learned](#what-i-learned)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

### The Challenge

Build a weather app where users can:

1. Search for weather information by location.
2. View current weather (temperature, weather icon, location).
3. See additional weather metrics: feels like temperature, humidity, wind speed, precipitation.
4. Browse a 7-day forecast with high/low temperatures.
5. View an hourly forecast for the selected day.
6. Switch between days using the day selector.
7. Toggle between Metric and Imperial units.
8. Have a responsive, mobile-first interface.

---

### Screenshot

![Weather App Screenshot](./preview.jpg)

---

### Links

- **Live Site:** [https://your-live-site-url.com](https://your-live-site-url.com)
- **Solution Repo:** [https://github.com/yora-dev/weather-app](https://github.com/yora-dev/weather-app)

---

## Features

- Search for a city and get current weather and forecasts.
- Interactive hourly forecast per day.
- Toggle units: Celsius/Fahrenheit, km/h-mph, mm/in.
- Default city: Addis Ababa, Ethiopia.
- Default selected day is today.
- Responsive layout for mobile, tablet, and desktop.

---

## Tech Stack

- **HTML5** for markup
- **CSS3** with Flexbox & Grid
- **JavaScript (ES6+)** for dynamic content
- **Fetch API** to get weather data from [Open-Meteo API](https://open-meteo.com/)
- **DOM manipulation** for updating UI dynamically

---

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-app.git
```

- Navigate into the project folder:
- cd weather-app
- Open index.html in your browser, or serve via a local server (e.g., Live Server in VSCode).

2. Usage

   - Type a city in the search bar to fetch weather data.
   - Click the day dropdown to view hourly forecasts for that day.
   - Click the unit toggle to switch between Metric and Imperial units.
   - Default city and day load automatically on page load.

3. What I Learned

   - Fetching and handling real-time weather data from an API.
   - Dynamically creating hourly and daily forecast cards.
   - Converting 24-hour time to 12-hour AM/PM format.
   - Managing UI state for unit conversions and day selection.
   - Responsive design and mobile-first development.

4. Future Improvements

   - Modularize code: separate API logic, DOM updates, and event handlers.
   - Add animations when switching days or units.
   - Save user preferences (unit, last searched city) in local storage.
   - Better error handling for API failures or empty results.

## Author

    - Yordanos Shanbel
    - GitHub: https://github.com/yora-dev
    - Frontend Mentor: https://www.frontendmentor.io/yora-dev
    - Discord: @yordanos01

## Acknowledgments

**Frontend Mentor** - For providing the challenge.
**Open-Meteo API** - For free and simple weather API.
