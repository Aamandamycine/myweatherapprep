function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  let humidityElement = document.querySelector("#Humidity");

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#Wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `${Math.round(wind)} km/h`;
  let iconElement = document.querySelector("#icon");
  let iconUrl = response.data.condition.icon_url;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", response.data.condition.description);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");
