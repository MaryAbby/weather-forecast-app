function cityTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date");
  let dayElement = document.querySelector("#day");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  city.innerHTML = response.data.city.toUpperCase();
  temperatureElement.innerHTML = `${Math.round(temperature)}°`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windspeedElement.innerHTML = response.data.wind.speed;
  timeElement.innerHTML = formatTime(date);
  dateElement.innerHTML = formatMonth(date).toUpperCase();
  dayElement.innerHTML = formatDate(date).toUpperCase();
  iconElement.innerHTML = `<img
      src= "${response.data.condition.icon_url}"
      class="weather-icon"
    />`;
  getForecast(response.data.city);
}
function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(date) {
  let days = [
    "sunday",
    "monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}

function formatMonth(date) {
  let monthDay = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  return `${monthDay} ${month}`;
}

function searchCity(city) {
  let apiKey = "1a747f2d7ac32a100bt13fab8776o6ca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}

function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}
function getForecast(city) {
  let apiKey = "1a747f2d7ac32a100bt13fab8776o6ca";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="row">
            <div class="col-2 column">
              <div class="weather-forecast-date">${day}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
                alt=""
                width="50"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-maximum">18°</span>
                <span class="weather-forecast-temperature-minimum">12°</span>
              </div>
              </div>
            </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchForm);

searchCity("Kampala");
