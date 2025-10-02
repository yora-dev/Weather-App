
let navUnits = document.querySelector('.nav__units');
let hourlyHeading = document.querySelector('.hourly__heading');
let dayDropdownList = document.querySelector('.day__dropdown-list');
let unitsDropdown = document.querySelector('.units__dropdown');

function dropDownActivator(dropDownType) {
  dropDownType.classList.toggle('display__units');
}

navUnits.addEventListener('click', function () {
  dropDownActivator(unitsDropdown)
});
hourlyHeading.addEventListener('click', function () {
  dropDownActivator(dayDropdownList)
});

let unitTemp = document.querySelectorAll('.unit__temp');
let unitSpeed = document.querySelectorAll('.unit__speed');
let unitPre = document.querySelectorAll('.unit__pre');

let tempUnit;
let speedUnit;
let preUnit;

function unitSwitch(unitType, unit) {
  unitType[1].children[0].style.display = 'none';

  unitType.forEach(function (item) {
    item.addEventListener('click', function () {
      if (this === unitType[0]) {
        if (unitType === unitTemp) {
          tempUnit = unit[0];
          console.log(tempUnit);

        } else if (unitType == unitSpeed) {
          speedUnit = unit[0];
          console.log(speedUnit);
        } else {
          preUnit = unit[0];
          console.log(preUnit);
        }
        unitType[0].classList.add('unit_activated');
        unitType[1].classList.remove('unit_activated');
        document.querySelector('.unit__header').innerHTML = 'Switch to Imperial';
        unitType[0].children[0].style.display = 'block';
        unitType[1].children[0].style.display = 'none';
      }
      else if (this === unitType[1]) {
        if (unitType === unitTemp) {
          tempUnit = unit[1];
          console.log(tempUnit);
        } else if (unitType == unitSpeed) {
          speedUnit = unit[1];
          console.log(speedUnit);
        } else {
          preUnit = unit[1];
          console.log(preUnit);
        }
        unitType[1].classList.add('unit_activated');
        unitType[0].classList.remove('unit_activated');
        document.querySelector('.unit__header').innerHTML = 'Switch to none';
        unitType[1].children[0].style.display = 'block';
        unitType[0].children[0].style.display = 'none';
      }

    });
  });
}

unitSwitch(unitTemp, ['celcius', 'fahrenheit']);
unitSwitch(unitSpeed, ['km/h', 'mph']);
unitSwitch(unitPre, ['mm', 'in']);

const weatherIcons = {
  0: "assets/images/icon-sunny.webp",              // Clear sky
  1: "assets/images/icon-partly-cloudy.webp",      // Mainly clear
  2: "assets/images/icon-partly-cloudy.webp",      // Partly cloudy
  3: "assets/images/icon-overcast.webp",           // Overcast

  45: "assets/images/icon-fog.webp",               // Fog
  48: "assets/images/icon-fog.webp",               // Depositing rime fog

  51: "assets/images/icon-drizzle.webp",           // Light drizzle
  53: "assets/images/icon-drizzle.webp",           // Moderate drizzle
  55: "assets/images/icon-drizzle.webp",           // Dense drizzle
  56: "assets/images/icon-drizzle.webp",           // Freezing drizzle (mapped to drizzle)
  57: "assets/images/icon-drizzle.webp",           // Freezing drizzle (dense)

  61: "assets/images/icon-rain.webp",              // Slight rain
  63: "assets/images/icon-rain.webp",              // Moderate rain
  65: "assets/images/icon-rain.webp",              // Heavy rain
  66: "assets/images/icon-rain.webp",              // Freezing rain (mapped to rain)
  67: "assets/images/icon-rain.webp",              // Freezing rain (heavy)

  71: "assets/images/icon-snow.webp",              // Slight snowfall
  73: "assets/images/icon-snow.webp",              // Moderate snowfall
  75: "assets/images/icon-snow.webp",              // Heavy snowfall
  77: "assets/images/icon-snow.webp",              // Snow grains

  80: "assets/images/icon-rain.webp",              // Rain showers (slight)
  81: "assets/images/icon-rain.webp",              // Rain showers (moderate)
  82: "assets/images/icon-rain.webp",              // Rain showers (violent)

  85: "assets/images/icon-snow.webp",              // Snow showers (slight)
  86: "assets/images/icon-snow.webp",              // Snow showers (heavy)

  95: "assets/images/icon-storm.webp",             // Thunderstorm
  96: "assets/images/icon-storm.webp",             // Thunderstorm with hail
  99: "assets/images/icon-storm.webp",             // Severe thunderstorm with hail
};


let listOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let listOfMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let today = new Date();
let todayDate = listOfDays[today.getDay()];
let monthDate = today.getDate();
let month = listOfMonth[today.getMonth()];
let year = today.getFullYear();
let currentDate = `${todayDate}, ${month} ${monthDate}, ${year}`


let selectedDay = null;
let allDays = document.querySelectorAll('.day__dropdown');
allDays.forEach(function (item) {
  dayChanger(item);
});


function dayChanger(item) {
  if (item.innerHTML == listOfDays[today.getDay()]) {
    item.classList.add('day-active');
    document.querySelector('.hourly__day').innerHTML = item.innerHTML;
  }

  item.addEventListener('click', function () {
    allDays.forEach(function (day) {
      day.classList.remove('day-active');
    });

    this.classList.add('day-active');
    document.querySelector('.hourly__day').innerHTML = this.innerHTML;
  });
}

let inputField = document.querySelector('#input-field');
let searchDropdown = document.querySelector('.search__dropdown');
inputField.value = `Addis Ababa, Ethiopia`;
inputField.addEventListener("keyup", getLocation);

async function getLocation() {
  if (inputField.value.length == 0) {
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
    let latitude = [];
    let longitude = [];

    for (let i = 0; i < data.results.length; i++) {
      searchDropdown.innerHTML +=
        `<p class="search__suggestion text-7" >${data.results[i].name}, ${data.results[i].country} </p>`;
      latitude.push(data.results[i].latitude);
      longitude.push(data.results[i].longitude);
      selectedCity(latitude, longitude);
    };


  } catch (error) {
    console.error("Error fetching cities:", error);
  }
}

function selectedCity(latitude, longitude) {

  let suggestionList = document.querySelectorAll('.search__suggestion');
  let suggestionArray = Array.from(suggestionList);
  suggestionArray.forEach(function (suggestion) {
    suggestion.addEventListener('click', function () {
      inputField.value = this.innerHTML;
      searchDropdown.innerHTML = '';
      searchDropdown.classList.remove('display__units');
      let index = suggestionArray.indexOf(this);

      let lat = latitude[index];
      let lon = longitude[index];
      suggestionArray = Array.from(suggestionList);

      getWeather(lat, lon, suggestionArray, index);

    });
  });
}

async function getWeather(lat, lon, suggestionArray = null, index = 0, cityName = 'Addis Ababa, Ethiopia') {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`;

  try {
    const weatherResponse = await fetch(url);
    const weatherData = await weatherResponse.json();

    const currentTemp = weatherData.current.temperature_2m;
    const currentHumidity = weatherData.current.relative_humidity_2m;
    const currentFeelLike = weatherData.current.apparent_temperature;
    const currentPrecipitation = weatherData.current.precipitation;
    const currentWindSpeed = weatherData.current.wind_speed_10m;
    const currentWeatherCode = weatherData.current.weather_code;

    const listOfDaysAbbreviate = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    const daily = weatherData.daily.time.map((day, i) => {
      const maxTemp = weatherData.daily.temperature_2m_max[i];
      const minTemp = weatherData.daily.temperature_2m_min[i];
      const dailyWeatherCode = weatherData.daily.weather_code[i];
      const dayToday = listOfDaysAbbreviate[(todayIndex + i) % 7];

      return {
        date: day,
        temp_max: maxTemp,
        temp_min: minTemp,
        dateName: dayToday,
        weatherCode: dailyWeatherCode
      };
    });

    (() => {
      const hourlyTimes = weatherData.hourly.time;
      const hourlyTemps = weatherData.hourly.temperature_2m;
      const hourlyCodes = weatherData.hourly.weather_code;

      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];

      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let todayIndex = now.getDay();

      let daily8Hours = {};


      hourlyTimes.forEach((timeStr, i) => {
        const hourDate = new Date(timeStr);
        const dateStr = timeStr.split("T")[0];


        if (dateStr === todayStr && hourDate < now) return;


        const diffDays = Math.floor((hourDate - now) / (1000 * 60 * 60 * 24));
        if (diffDays >= 7) return;


        const dayName = dayNames[hourDate.getDay()];

        if (!daily8Hours[dayName]) daily8Hours[dayName] = [];


        if (daily8Hours[dayName].length < 7) {
          let hours = hourDate.getHours();
          let ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12;
          hours = hours ? hours : 12;
          const formattedTime = `${hours} ${ampm}`;

          daily8Hours[dayName].push({
            time: formattedTime,
            temperature: hourlyTemps[i],
            weatherCode: hourlyCodes[i]
          });
        }
      });

      let orderedDays = {};
      for (let i = 0; i < 7; i++) {
        const idx = (todayIndex + i) % 7;
        const name = dayNames[idx];
        if (daily8Hours[name]) {
          orderedDays[name] = daily8Hours[name];
        }
      }

      const daysArray = Object.entries(orderedDays);
      let hourlyForecast = document.querySelector('.hourly-forecast-container-day');
      for (let i = 0; i < allDays.length; i++) {

        allDays[i].addEventListener('click', function () {
          hourlyForecast.innerHTML = '';
          let indexDay = listOfDays.indexOf(this.innerHTML);

          daysArray[indexDay][1].forEach(function (ele) {
            console.log(ele.time);
            hourlyForecast.innerHTML += `<div class="hourly__card">
            <img
              src=${weatherIcons[ele.weatherCode]}
              alt=""
              class="hourly__img"
            />
            <p class="hourly__time text-5">${ele.time}</p>
            <p class="hourly__temp text-7">${Math.round(ele.temperature)}&deg;</p>
          </div>`
          })
        });
      };
    })();

    let generalInfo = document.querySelector('.general-info-container');

    generalInfo.innerHTML = `<div class="city-date-info">
            <p class="city text-4">${suggestionArray ? suggestionArray[index].innerHTML : cityName}</p>
            <p class="date text-6">${currentDate}</p>
          </div>
          <div class="temp-info">
            <img src=${weatherIcons[currentWeatherCode]} alt="" class="sunny__img" />
            <p class="temp text-1">${Math.round(currentTemp)}&deg;</p>
          </div>`;

    let detailInfo = document.querySelector('.detail-info-container');
    detailInfo.innerHTML = `<div class="detail__card">
            <p class="detail__header text-6">Feels Like</p>
            <p class="detail__value text-3">${Math.round(currentFeelLike)}&deg;</p>
          </div>
          <div class="detail__card">
            <p class="detail__header text-6">Humidity</p>
            <p class="detail__value text-3">${currentHumidity}%</p>
          </div>
          <div class="detail__card">
            <p class="detail__header text-6">Wind</p>
            <p class="detail__value text-3">${currentWindSpeed} km/h</p>
          </div>
          <div class="detail__card">
            <p class="detail__header text-6">Precipitation</p>
            <p class="detail__value text-3">${currentPrecipitation} mm</p>
          </div>`;

    let dailyForecast = document.querySelector('.daily-forecast-container');
    dailyForecast.innerHTML = '';
    daily.forEach(function (dailyDate) {
      dailyForecast.innerHTML += `<div class="daily__card">
            <p class="daily__day text-6">${dailyDate.dateName}</p>
            <img src=${weatherIcons[dailyDate.weatherCode]} alt="" class="daily__img" />
            <div class="daily__temp">
              <p class="daily__high text-7">${Math.round(dailyDate.temp_max)}&deg;</p>
              <p class="daily__low text-7">${Math.round(dailyDate.temp_min)}&deg;</p>
            </div>
          </div>`;
    });

  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
}


function defaultCity() {
  let lat = 9.02497;
  let lon = 38.74689;
  getWeather(lat, lon);
}

defaultCity();
function defaultDay() {

  let today = new Date();
  let todayName = listOfDays[today.getDay()];

  allDays.forEach(day => day.classList.remove('day-active'));

  let todayElement = Array.from(allDays).find(day => day.innerHTML === todayName);
  if (!todayElement) return;

  todayElement.classList.add('day-active');

  let indexDay = listOfDays.indexOf(todayName);
  if (typeof daysArray !== 'undefined' && daysArray[indexDay]) {
    let hourlyForecast = document.querySelector('.hourly-forecast-container-day');
    hourlyForecast.innerHTML = '';
    daysArray[indexDay][1].forEach(function (ele) {
      hourlyForecast.innerHTML += `<div class="hourly__card">
        <img src=${weatherIcons[ele.weatherCode]} alt="" class="hourly__img" />
        <p class="hourly__time text-5">${ele.time}</p>
        <p class="hourly__temp text-7">${Math.round(ele.temperature)}&deg;</p>
      </div>`;
    });
  }

  document.querySelector('.hourly__day').innerHTML = todayName;
}

// Call defaultDay after weather data has loaded
defaultDay()
