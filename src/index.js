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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-sm-3">
    <div class="text-center">
    <div class="card-body">
    <h5 class="card-title day"> ${formatDay(forecastDay.dt)}</h5>
    
    <img src="https://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="42px" />
    <span class="card-text temperature" id="temp-max">${Math.round(
      forecastDay.temp.max
    )}˚ </span>|<span id="temp-min"> ${Math.round(
          forecastDay.temp.min
        )}˚ </span>
    </div>
    </div>
    </div>
  
 `;
    }
    forecastElement.innerHTML = forecastHTML;
  });
}

function getForecast(coordinates) {
  let myApiKey = "c3704d557b195c9549dbf7f2691c5783";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${myApiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#weather-description");
  let cityDescription = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let cityHumidity = response.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  let cityWindSpeed = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  cityTemperature.innerHTML = temperature;
  descriptionElement.innerHTML = cityDescription;
  humidityElement.innerHTML = cityHumidity;
  windElement.innerHTML = cityWindSpeed;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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
  let localIcon = document.querySelector("#icon");

  locationTemperature.innerHTML = `It is currently ${currentTemp}˚C in ${city}`;
  localDescriptionElement.innerHTML = localDescription;
  localHumidityElement.innerHTML = localHumidity;
  localWindElement.innerHTML = localWindSpeed;
  localIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  localIcon.setAttribute("alt", response.data.weather[0].description);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;
