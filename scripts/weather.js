function weather(unit) {
  var cityName;
  var temperature;
  var tempMax;
  var tempMin;
  var feelLike;
  var icon;

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=Iasi&units=${unit}&appid=1a013505cb6de684e80f011688f6e136`
  )
    .then((res) => res.json())
    .then((data) => {
      cityName = data['name'];

      temperature = data['main']['temp'];
      tempMax = data['main']['temp_max'];
      tempMin = data['main']['temp_min'];
      feelLike = data['main']['feels_like'];
      icon = data['weather'][0]['icon'];
      console.log(cityName);
      console.log(feelLike);
      console.log(tempMin);
      console.log(tempMax);
      console.log(temperature);

      displayWeather(cityName, temperature, tempMax, tempMin, feelLike, icon);
    });
}

function displayWeather(
  cityName,
  temperature,
  tempMax,
  tempMin,
  feelLike,
  icon
) {
  var city = document.getElementById('city');
  city.innerText = 'Current weather in ' + cityName;
  var currentTemp = document.getElementById('temp');
  currentTemp.innerText = temperature;
  var minTemp = document.getElementById('tempmin');
  minTemp.innerText = tempMin;
  var maxTemp = document.getElementById('tempmax');
  maxTemp.innerText = tempMax;
  var feel = document.getElementById('feels__like');
  feel.innerText = feelLike;
  var img = document.getElementById('img');
  img.src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
}

function temperature() {
  const storageName = 'selectedTemperature';
  const tempToggle = document.querySelector('[data-temperature-toggle]');
  const radios = tempToggle.querySelectorAll('[type=radio]');
  var tempUnits = { Celsius: 'metric', Fahrenheit: 'imperial' };
  let savedValue;
  if (window.localStorage) {
    savedValue = localStorage.getItem(storageName);
  } else {
    savedValue = getValueFromCookie(storageName);
  }
  weather(savedValue);
  for (const radio of radios) {
    console.log(tempUnits[radio.value]);
    if (tempUnits[radio.value] === savedValue) {
      radio.checked = true;
    }
    radio.addEventListener('change', handleRadioChange);
  }

  function handleRadioChange(e) {
    const temp = e.target.value;

    if (window.localStorage) {
      localStorage.setItem(storageName, tempUnits[temp]);
    } else {
      document.cookie = `${storageName}=${tempUnits[temp]}`;
    }
    weather(tempUnits[temp]);
  }
}
temperature();

function getValueFromCookie(name) {
  const cookies = document.cookie.split('; ');

  for (const cookie of cookies) {
    const [cName, cValue] = cookie.split('=');
    if (cName === name) {
      return cValue;
    }
  }
}
