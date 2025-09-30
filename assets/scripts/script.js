
let navUnits = document.querySelector('.nav__units');
let hourlyHeading = document.querySelector('.hourly__heading');
let dayDropdownList = document.querySelector('.day__dropdown-list');
let unitsDropdown = document.querySelector('.units__dropdown');

function dropDownActivator(dropDownType) {
  dropDownType.classList.toggle('display__units')
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

function unitSwitch(unitType) {
  unitType.forEach(function (item) {
    unitType[1].children[0].style.display = 'none';
    item.addEventListener('click', function () {

      if (this === unitType[0]) {
        unitType[0].classList.add('unit_activated');
        unitType[1].classList.remove('unit_activated');
        document.querySelector('.unit__header').innerHTML = 'Switch to Imperial';
        unitType[0].children[0].style.display = 'block';
        unitType[1].children[0].style.display = 'none';
      }

      if (this === unitType[1]) {
        unitType[1].classList.add('unit_activated');
        unitType[0].classList.remove('unit_activated');
        document.querySelector('.unit__header').innerHTML = 'Switch to none';
        unitType[1].children[0].style.display = 'block';
        unitType[0].children[0].style.display = 'none';
      }
    });
  });
}

unitSwitch(unitTemp);
unitSwitch(unitSpeed);
unitSwitch(unitPre);

let listOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let listOfMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let today = new Date();
let todayDate = listOfDays[today.getDay()];
let monthDate = today.getDate();
let month = listOfMonth[today.getMonth()];
let year = today.getFullYear();
let currentDate = `${todayDate}, ${month} ${monthDate}, ${year}`
console.log(currentDate);


let allDays = document.querySelectorAll('.day__dropdown');
allDays.forEach(function (item) {

  if (item.innerHTML == listOfDays[today.getDay()]) {
    item.classList.add('day-active');
    document.querySelector('.hourly__day').innerHTML = item.innerHTML;
  }

  item.addEventListener('click', function () {
    allDays.forEach(function (day) {
      day.classList.remove('day-active')
    });

    this.classList.add('day-active');
    document.querySelector('.hourly__day').innerHTML = this.innerHTML;

  })
});

let inputField = document.querySelector('#input-field');
let searchDropdown = document.querySelector('.search__dropdown');
inputField.value = `Addis Ababa, Ethiopia`
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

      console.log(lat, lon);

      getWeather(lat, lon, suggestionArray, index);
    })
  });
}

async function getWeather(lat, lon, suggestionArray, index) {

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`;

  try {
    const weatherResponse = await fetch(url);
    const weatherData = await weatherResponse.json();

    const currentTemp = weatherData.current.temperature_2m;
    const currentHumidity = weatherData.current.relative_humidity_2m;
    const currentFeelLike = weatherData.current.apparent_temperature;
    const currentPrecipitation = weatherData.current.precipitation;
    const currentWindSpeed = weatherData.current.wind_speed_10m;

    const hourlyTimes = weatherData.hourly.time;
    const hourlyTemps = weatherData.hourly.temperature_2m;
    const hourlyCode = weatherData.hourly.weather_code;

    const dailyHours = {};
    hourlyTimes.forEach((timeStr, i) => {
      const date = timeStr.split('T')[0]; // YYYY-MM-DD
      if (!dailyHours[date]) dailyHours[date] = [];
      dailyHours[date].push({
        time: timeStr,
        temperature: hourlyTemps[i],
        weatherCode: hourlyCode[i]
      });
    });
    const next10PerDay = {};
    Object.keys(dailyHours).forEach(date => {
      next10PerDay[date] = dailyHours[date].slice(0, 10);
    });
    const daily = weatherData.daily.time.map((day, i) => {
      const maxTemp = weatherData.daily.temperature_2m_max[i];
      const minTemp = weatherData.daily.temperature_2m_min[i];
      const dailyWeatherCode = weatherData.daily.weather_code;
      return {
        date: day,
        temp_max: maxTemp,
        temp_min: minTemp,
        averageTemp: (maxTemp + minTemp) / 2,
        weatherCode: dailyWeatherCode
      };
    });

    console.log("Next 10 hours forecast:", next10PerDay);
    console.log("7-day forecast with averages:", daily);

    let generalInfo = document.querySelector('.general-info-container');
    generalInfo.innerHTML = `<div class="city-date-info">
            <p class="city text-4">${suggestionArray[index].innerHTML}</p>
            <p class="date text-6">${currentDate}</p>
          </div>
          <div class="temp-info">
            <img
              src="assets/images/icon-sunny.webp"
              alt=""
              class="sunny__img"
            />
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
    suggestionArray = suggestionArray;
    index = index;

  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
}

function defaultCity() {
  let lat = 9.02497;
  let lon = 38.74689;
  getWeather(lat, lon, suggestionArray, index);
  let generalInfo = document.querySelector('.general-info-container');
  generalInfo.innerHTML = `<div class="city-date-info">
            <p class="city text-4">${inputField.value}</p>
            <p class="date text-6">Tuesday, Aug 5, 2025</p>
          </div>
          <div class="temp-info">
            <img
              src="assets/images/icon-sunny.webp"
              alt=""
              class="sunny__img"
            />
            <p class="temp text-1">${currentTemp}&deg;</p>
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
}

defaultCity();






