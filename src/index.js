let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDayTime = document.querySelector("#current-day-time");
currentDayTime.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#weather-description");
  let cityDescription = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let cityHumidity = response.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  let cityWindSpeed = Math.round(response.data.wind.speed);
  cityTemperature.innerHTML = temperature;
  descriptionElement.innerHTML = cityDescription;
  humidityElement.innerHTML = cityHumidity;
  windElement.innerHTML = cityWindSpeed;
}

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city.value}`;

  let myApiKey = "c3704d557b195c9549dbf7f2691c5783";
  let units = "metric";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${myApiKey}&units=${units}`;
  axios.get(weatherApiUrl).then(showWeather);
}

let citySearch = document.querySelector("#search-city-form");
citySearch.addEventListener("submit", inputCity);

function showLocalTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let locationTemperature = document.querySelector("h2");
  let localDescriptionElement = document.querySelector("#weather-description");
  let localDescription = response.data.weather[0].description;
  let localHumidityElement = document.querySelector("#humidity");
  let localHumidity = Math.round(response.data.main.humidity);
  let localWindElement = document.querySelector("#wind-speed");
  let localWindSpeed = Math.round(response.data.wind.speed);

  locationTemperature.innerHTML = `It is currently ${currentTemp}˚C in ${city}`;
  localDescriptionElement.innerHTML = localDescription;
  localHumidityElement.innerHTML = localHumidity;
  localWindElement.innerHTML = localWindSpeed;
}
function showPosition(position) {
  let myApiKey = "c3704d557b195c9549dbf7f2691c5783";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myApiKey}&units=${units}`;
  axios.get(weatherApiUrl).then(showLocalTemp);
}

function getPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getPosition);
