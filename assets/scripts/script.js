
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

let allDays = document.querySelectorAll('.day__dropdown');
allDays.forEach(function (item) {
  let listOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let today = new Date();
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
inputField.addEventListener("keyup", getLocation);

async function getLocation() {
  if (inputField.value.length == 0) {
    searchDropdown.classList.remove('display__units');
    return;
  }
  searchDropdown.classList.add('display__units');
  const query = inputField.value.trim();
  try {
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
  suggestionList.forEach(function (suggestion) {
    suggestion.addEventListener('click', function () {
      inputField.value = this.innerHTML;
      searchDropdown.innerHTML = '';
      searchDropdown.classList.remove('display__units');
      let suggestionArray = Array.from(suggestionList);
      let index = suggestionArray.indexOf(this);

      let lat = latitude[index];
      let lon = longitude[index];
      console.log(lat, lon);
      getWeather(lat, lon);
    })
  });
}

async function getWeather(lat, lon) {
  try {
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=auto`);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
  } catch (error) {
    console.log(error);
  }
}






