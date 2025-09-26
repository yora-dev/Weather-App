let navUnits = document.querySelector('.nav__units');
let unitsDropdown = document.querySelector('.units__dropdown');

navUnits.addEventListener('click', function () {
  unitsDropdown.classList.toggle('display__units');
})

let hourlyHeading = document.querySelector('.hourly__heading');
let dayDropdownList = document.querySelector('.day__dropdown-list');

hourlyHeading.addEventListener('click', function () {
  dayDropdownList.classList.toggle('display__units')
})

let unitTemp = document.querySelectorAll('.unit__temp');
unitTemp.forEach(function (item) {
  unitTemp[1].children[0].style.display = 'none';
  item.addEventListener('click', function () {

    if (this === unitTemp[0]) {
      unitTemp[0].classList.add('unit_activated');
      unitTemp[1].classList.remove('unit_activated');
      document.querySelector('.unit__header').innerHTML = 'Switch to Imperial';
      unitTemp[0].children[0].style.display = 'block';
      unitTemp[1].children[0].style.display = 'none';
    }

    if (this === unitTemp[1]) {
      unitTemp[1].classList.add('unit_activated');
      unitTemp[0].classList.remove('unit_activated');
      document.querySelector('.unit__header').innerHTML = 'Switch to none';
      unitTemp[1].children[0].style.display = 'block';
      unitTemp[0].children[0].style.display = 'none';
    }
  });
});

let unitSpeed = document.querySelectorAll('.unit__speed');
unitSpeed.forEach(function (item) {
  unitSpeed[1].children[0].style.display = 'none';
  item.addEventListener('click', function () {

    if (this === unitSpeed[0]) {
      unitSpeed[0].classList.add('unit_activated');
      unitSpeed[1].classList.remove('unit_activated');
      document.querySelector('.unit__header').innerHTML = 'Switch to Imperial';
      unitSpeed[0].children[0].style.display = 'block';
      unitSpeed[1].children[0].style.display = 'none';
    }

    if (this === unitSpeed[1]) {
      unitSpeed[1].classList.add('unit_activated');
      unitSpeed[0].classList.remove('unit_activated');
      document.querySelector('.unit__header').innerHTML = 'Switch to none';
      unitSpeed[1].children[0].style.display = 'block';
      unitSpeed[0].children[0].style.display = 'none';
    }
  });
});

let unitPre = document.querySelectorAll('.unit__pre');
unitPre.forEach(function (item) {
  unitPre[1].children[0].style.display = 'none';
  item.addEventListener('click', function () {

    if (this === unitPre[0]) {
      unitPre[0].classList.add('unit_activated');
      unitPre[1].classList.remove('unit_activated');
      document.querySelector('.unit__header').innerHTML = 'Switch to Imperial';
      unitPre[0].children[0].style.display = 'block';
      unitPre[1].children[0].style.display = 'none';
    }

    if (this === unitPre[1]) {
      unitPre[1].classList.add('unit_activated');
      unitPre[0].classList.remove('unit_activated');
      document.querySelector('.unit__header').innerHTML = 'Switch to none';
      unitPre[1].children[0].style.display = 'block';
      unitPre[0].children[0].style.display = 'none';
    }
  });
});

let allDays = document.querySelectorAll('.day__dropdown');
allDays.forEach(function (item) {
  let listOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let today = new Date();
  if (item.innerHTML == listOfDays[today.getDay() - 1]) {
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
})