function displayDate() {
  let now = new Date();
  let weekDay = document.querySelector("#currentWeekDay");
  weekDay.innerHTML = `${days[now.getDay()]}`;
  let month = document.querySelector("#month");
  month.innerHTML = `${months[now.getMonth()]}`;
  let date = document.querySelector("#date");
  date.innerHTML = `${now.getDate()}`;
  let time = document.querySelector("#time");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  time.innerHTML = `${hours}:${minutes}`;
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}

//problem with hours and minutes when below 10!!! not solved yet

function changeCurrentTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "e524889f4a95d6519e386f678436ec4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(changeCurrentTemp);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  search(city);
}

function clickFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function clickCelsius(event) {
  event.preventDefault();
  let tempC = document.querySelector("#currentTemp");
  tempC.innerHTML = `19`;
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "e524889f4a95d6519e386f678436ec4a";
  let apiUrlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlCoords).then(changeCurrentTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getLocation);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", changeCity);

let fahrenheitIcon = document.querySelector("#fahrenheit");
fahrenheitIcon.addEventListener("click", clickFahrenheit);

let celsiusIcon = document.querySelector("#celsius");
celsiusIcon.addEventListener("click", clickCelsius);

displayDate();

search("Lisbon");
