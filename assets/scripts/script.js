// ===== DOM Elements =====
let navUnits = document.querySelector('.nav__units');
let hourlyHeading = document.querySelector('.hourly__heading');
let dayDropdownList = document.querySelector('.day__dropdown-list');
let unitsDropdown = document.querySelector('.units__dropdown');

let unitTemp = document.querySelectorAll('.unit__temp');
let unitSpeed = document.querySelectorAll('.unit__speed');
let unitPre = document.querySelectorAll('.unit__pre');

let allDays = document.querySelectorAll('.day__dropdown');
let inputField = document.querySelector('#input-field');
let searchDropdown = document.querySelector('.search__dropdown');

let daysArray = []; // Global variable for hourly forecast per day

// ===== UNIT STATE =====
let selectedUnits = {
  temp: "C",
  speed: "km/h",
  pre: "mm"
};

// ===== Utility Functions =====
function dropDownActivator(dropDownType) {
  dropDownType.classList.toggle('display__units');
}

// ===== Event Listeners for Dropdowns =====
navUnits.addEventListener('click', () => dropDownActivator(unitsDropdown));
hourlyHeading.addEventListener('click', () => dropDownActivator(dayDropdownList));

// ===== Conversion =====
function convertValue(value, type) {
  if (type === "temp") return selectedUnits.temp === "C" ? value : (value * 9 / 5) + 32;
  if (type === "speed") return selectedUnits.speed === "km/h" ? value : value / 1.609;
  if (type === "pre") return selectedUnits.pre === "mm" ? value : value / 25.4;
  return value;
}

// ===== Update UI after switching units =====
function updateDisplayedUnits() {
  document.querySelectorAll(".hourly__temp").forEach(el => {
    let raw = parseFloat(el.getAttribute("data-value"));
    el.innerHTML = `${Math.round(convertValue(raw, "temp"))}°`;
  });

  document.querySelectorAll(".daily__high, .daily__low").forEach(el => {
    let raw = parseFloat(el.getAttribute("data-value"));
    el.innerHTML = `${Math.round(convertValue(raw, "temp"))}°`;
  });

  document.querySelectorAll(".detail__value, .temp").forEach(el => {
    let type = el.getAttribute("data-type");
    if (!type) return;
    let raw = parseFloat(el.getAttribute("data-value"));
    if (type === "temp") el.innerHTML = `${Math.round(convertValue(raw, "temp"))}°`;
    if (type === "speed") el.innerHTML = `${Math.round(convertValue(raw, "speed"))} ${selectedUnits.speed}`;
    if (type === "pre") el.innerHTML = `${convertValue(raw, "pre").toFixed(1)} ${selectedUnits.pre}`;
  });
}

// ===== Unit Switcher =====
function unitSwitch(unitType, type) {
  unitType[1].children[0].style.display = 'none';

  unitType.forEach(item => {
    item.addEventListener('click', function () {
      if (this === unitType[0]) {
        unitType[0].classList.add('unit_activated');
        unitType[1].classList.remove('unit_activated');
        document.querySelector('.unit__header').innerHTML = 'Switch to Imperial';
        unitType[0].children[0].style.display = 'block';
        unitType[1].children[0].style.display = 'none';

        if (type === "temp") selectedUnits.temp = "C";
        if (type === "speed") selectedUnits.speed = "km/h";
        if (type === "pre") selectedUnits.pre = "mm";

      } else {
        unitType[1].classList.add('unit_activated');
        unitType[0].classList.remove('unit_activated');
        document.querySelector('.unit__header').innerHTML = 'Switch to Metrics';
        unitType[1].children[0].style.display = 'block';
        unitType[0].children[0].style.display = 'none';

        if (type === "temp") selectedUnits.temp = "F";
        if (type === "speed") selectedUnits.speed = "mph";
        if (type === "pre") selectedUnits.pre = "in";
      }
      updateDisplayedUnits();
    });
  });
}

unitSwitch(unitTemp, "temp");
unitSwitch(unitSpeed, "speed");
unitSwitch(unitPre, "pre");

// ===== Weather Icons =====
const weatherIcons = {
  0: "assets/images/icon-sunny.webp",
  1: "assets/images/icon-partly-cloudy.webp",
  2: "assets/images/icon-partly-cloudy.webp",
  3: "assets/images/icon-overcast.webp",
  45: "assets/images/icon-fog.webp",
  48: "assets/images/icon-fog.webp",
  51: "assets/images/icon-drizzle.webp",
  53: "assets/images/icon-drizzle.webp",
  55: "assets/images/icon-drizzle.webp",
  56: "assets/images/icon-drizzle.webp",
  57: "assets/images/icon-drizzle.webp",
  61: "assets/images/icon-rain.webp",
  63: "assets/images/icon-rain.webp",
  65: "assets/images/icon-rain.webp",
  66: "assets/images/icon-rain.webp",
  67: "assets/images/icon-rain.webp",
  71: "assets/images/icon-snow.webp",
  73: "assets/images/icon-snow.webp",
  75: "assets/images/icon-snow.webp",
  77: "assets/images/icon-snow.webp",
  80: "assets/images/icon-rain.webp",
  81: "assets/images/icon-rain.webp",
  82: "assets/images/icon-rain.webp",
  85: "assets/images/icon-snow.webp",
  86: "assets/images/icon-snow.webp",
  95: "assets/images/icon-storm.webp",
  96: "assets/images/icon-storm.webp",
  99: "assets/images/icon-storm.webp",
};

// ===== Date Handling =====
let listOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let listOfMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let today = new Date();
let todayDate = listOfDays[today.getDay()];
let monthDate = today.getDate();
let month = listOfMonth[today.getMonth()];
let year = today.getFullYear();
let currentDate = `${todayDate}, ${month} ${monthDate}, ${year}`;

// ===== Day Dropdown Handling =====
allDays.forEach(day => {
  day.addEventListener('click', function () {
    allDays.forEach(d => d.classList.remove('day-active'));
    this.classList.add('day-active');
    document.querySelector('.hourly__day').innerHTML = this.innerHTML;

    let indexDay = listOfDays.indexOf(this.innerHTML);
    if (daysArray[indexDay]) {
      let hourlyForecast = document.querySelector('.hourly-forecast-container-day');
      hourlyForecast.innerHTML = '';
      daysArray[indexDay][1].forEach(ele => {
        hourlyForecast.innerHTML += `<div class="hourly__card">
          <img src=${weatherIcons[ele.weatherCode]} alt="" class="hourly__img" />
          <p class="hourly__time text-5">${ele.time}</p>
          <p class="hourly__temp text-7" data-value="${ele.temperature}">
            ${Math.round(convertValue(ele.temperature, "temp"))}°
          </p>
        </div>`;
      });
    }
  });
});


async function getWeather(lat, lon, suggestionArray = null, index = 0, cityName = 'Addis Ababa, Ethiopia') {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`;

  try {
    const weatherResponse = await fetch(url);
    const weatherData = await weatherResponse.json();

    // Current Weather
    const currentTemp = weatherData.current.temperature_2m;
    const currentHumidity = weatherData.current.relative_humidity_2m;
    const currentFeelLike = weatherData.current.apparent_temperature;
    const currentPrecipitation = weatherData.current.precipitation;
    const currentWindSpeed = weatherData.current.wind_speed_10m;
    const currentWeatherCode = weatherData.current.weather_code;

    // Daily Forecast
    const listOfDaysAbbrev = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    const daily = weatherData.daily.time.map((day, i) => ({
      date: day,
      temp_max: weatherData.daily.temperature_2m_max[i],
      temp_min: weatherData.daily.temperature_2m_min[i],
      dateName: listOfDaysAbbrev[(todayIndex + i) % 7],
      weatherCode: weatherData.daily.weather_code[i]
    }));

    // Hourly Forecast
    const hourlyTimes = weatherData.hourly.time;
    const hourlyTemps = weatherData.hourly.temperature_2m;
    const hourlyCodes = weatherData.hourly.weather_code;

    const now = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let todayIdx = now.getDay();

    let daily8Hours = {};
    hourlyTimes.forEach((timeStr, i) => {
      const hourDate = new Date(timeStr);
      if (hourDate < now) return;
      const dayName = dayNames[hourDate.getDay()];
      if (!daily8Hours[dayName]) daily8Hours[dayName] = [];
      if (daily8Hours[dayName].length < 7) {
        let hours = hourDate.getHours();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        daily8Hours[dayName].push({
          time: `${hours} ${ampm}`,
          temperature: hourlyTemps[i],
          weatherCode: hourlyCodes[i]
        });
      }
    });

    // Order days starting from today
    let orderedDays = {};
    for (let i = 0; i < 7; i++) {
      const idx = (todayIdx + i) % 7;
      const name = dayNames[idx];
      if (daily8Hours[name]) orderedDays[name] = daily8Hours[name];
    }
    daysArray = Object.entries(orderedDays);

    // ===== Display Current Weather =====
    document.querySelector('.general-info-container').innerHTML = `
      <div class="city-date-info">
        <p class="city text-4">${cityName}</p>
        <p class="date text-6">${currentDate}</p>
      </div>
      <div class="temp-info">
        <img src=${weatherIcons[currentWeatherCode]} alt="" class="sunny__img" />
        <p class="temp text-1" data-type="temp" data-value="${currentTemp}">
          ${Math.round(convertValue(currentTemp, "temp"))}°
        </p>
      </div>`;

    document.querySelector('.detail-info-container').innerHTML = `
      <div class="detail__card">
        <p class="detail__header text-6">Feels Like</p>
        <p class="detail__value text-3" data-type="temp" data-value="${currentFeelLike}">
          ${Math.round(convertValue(currentFeelLike, "temp"))}°
        </p>
      </div>
      <div class="detail__card">
        <p class="detail__header text-6">Humidity</p>
        <p class="detail__value text-3">${currentHumidity}%</p>
      </div>
      <div class="detail__card">
        <p class="detail__header text-6">Wind</p>
        <p class="detail__value text-3" data-type="speed" data-value="${currentWindSpeed}">
          ${Math.round(convertValue(currentWindSpeed, "speed"))} ${selectedUnits.speed}
        </p>
      </div>
      <div class="detail__card">
        <p class="detail__header text-6">Precipitation</p>
        <p class="detail__value text-3" data-type="pre" data-value="${currentPrecipitation}">
          ${convertValue(currentPrecipitation, "pre").toFixed(1)} ${selectedUnits.pre}
        </p>
      </div>`;

    // ===== Display Daily Forecast =====
    let dailyForecast = document.querySelector('.daily-forecast-container');
    dailyForecast.innerHTML = '';
    daily.forEach(dailyDate => {
      dailyForecast.innerHTML += `<div class="daily__card">
        <p class="daily__day text-6">${dailyDate.dateName}</p>
        <img src=${weatherIcons[dailyDate.weatherCode]} alt="" class="daily__img" />
        <div class="daily__temp">
          <p class="daily__high text-7" data-value="${dailyDate.temp_max}">
            ${Math.round(convertValue(dailyDate.temp_max, "temp"))}°
          </p>
          <p class="daily__low text-7" data-value="${dailyDate.temp_min}">
            ${Math.round(convertValue(dailyDate.temp_min, "temp"))}°
          </p>
        </div>
      </div>`;
    });

    selectDefaultDay();
  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
}

// ===== Default Day Selection =====


function selectDefaultDay() {
  const now = new Date();
  const todayName = listOfDays[now.getDay()];

  allDays.forEach(day => day.classList.remove('day-active'));
  const todayElement = Array.from(allDays).find(day => day.innerHTML === todayName);
  if (!todayElement) return;

  todayElement.classList.add('day-active');
  document.querySelector('.hourly__day').innerHTML = todayName;

  const indexDay = daysArray.findIndex(d => d[0] === todayName);
  if (indexDay === -1) return;

  const hourlyForecast = document.querySelector('.hourly-forecast-container-day');
  hourlyForecast.innerHTML = '';

  // Filter hours starting from now
  const hoursFromNow = daysArray[indexDay][1].filter(ele => {
    const hourParts = ele.time.split(' ')[0]; // '12' from '12 AM'
    let hour = parseInt(hourParts);
    const ampm = ele.time.split(' ')[1];
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;

    const forecastDate = new Date();
    forecastDate.setHours(hour, 0, 0, 0);

    return forecastDate >= now;
  });

  hoursFromNow.forEach(ele => {
    hourlyForecast.innerHTML += `<div class="hourly__card">
      <img src=${weatherIcons[ele.weatherCode]} alt="" class="hourly__img" />
      <p class="hourly__time text-5">${ele.time}</p>
      <p class="hourly__temp text-7" data-value="${ele.temperature}">
        ${Math.round(convertValue(ele.temperature, "temp"))}°
      </p>
    </div>`;
  });
}


// ===== Location Search =====
inputField.value = "Addis Ababa, Ethiopia";
inputField.addEventListener("keyup", getLocation);

async function getLocation() {
  if (!inputField.value.length) {
    searchDropdown.classList.remove('display__units');
    return;
  }

  searchDropdown.classList.add('display__units');
  try {
    const query = inputField.value.trim();
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&format=json&count=4`
    );
    const data = await response.json();
    searchDropdown.innerHTML = '';

    if (!data.results || data.results.length === 0) {
      searchDropdown.innerHTML = `<p class="text-7">No results found</p>`;
      return;
    }

    data.results.forEach(city => {
      searchDropdown.innerHTML += `<p class="search__suggestion text-7" data-lat="${city.latitude}" data-lon="${city.longitude}">${city.name}, ${city.country}</p>`;
    });

    attachCityClick();
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
}

function attachCityClick() {
  let suggestionList = document.querySelectorAll('.search__suggestion');
  suggestionList.forEach(suggestion => {
    suggestion.addEventListener('click', function () {
      const lat = parseFloat(this.getAttribute('data-lat'));
      const lon = parseFloat(this.getAttribute('data-lon'));
      inputField.value = this.innerHTML;
      searchDropdown.innerHTML = '';
      searchDropdown.classList.remove('display__units');

      getWeather(lat, lon, null, 0, this.innerHTML);
    });


  });
  // Trigger first suggestion on Enter
  // Trigger first suggestion on Enter
  inputField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const firstSuggestion = searchDropdown.querySelector(".search__suggestion");
      if (firstSuggestion) {
        firstSuggestion.click(); // trigger same event as clicking

        // Clear input and hide dropdown
      }
    }
    searchDropdown.innerHTML = '';
    searchDropdown.classList.remove('display__units');
  });
  const searchBtn = document.querySelector('.search__btn'); // adjust selector if needed

  // Search button click
  searchBtn.addEventListener('click', function () {
    const firstSuggestion = searchDropdown.querySelector(".search__suggestion");
    if (firstSuggestion) {
      firstSuggestion.click(); // trigger the same event
      // Clear and hide dropdown
      searchDropdown.innerHTML = '';
      searchDropdown.classList.remove('display__units');
    }
  });


}

// ===== Default City =====
function defaultCity() {
  let lat = 9.02497;
  let lon = 38.74689;
  getWeather(lat, lon);
}

defaultCity();
