function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  let humidityElement = document.querySelector("#Humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#Wind");
  let wind = response.data.wind.speed;
  windSpeedElement.innerHTML = `${Math.round(wind)} km/h`;

  let iconElement = document.querySelector("#icon");
  let iconUrl = response.data.condition.icon_url;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", response.data.condition.description);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time);

  getForecast(response.data.city);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3dea2t99ce0052e3130d4f28b3eb9cof";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "3dea2t99ce0052e3130d4f28b3eb9cof";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(
                day.time * 1000
              )}</div>

              <div class="weather-forecast-icon">⛅</div>
              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon"/>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong>${Math.round(day.temperature.maximum)}°</strong>
                </div>
                <div class="weather-forecast-temperature">${Math.round(
                  day.temperature.minimum
                )}°</div>
              </div>
            </div>`;
    }
  });

  forecast.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
getForecast("Paris");
displayForecast();
