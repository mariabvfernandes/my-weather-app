function displayDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = days[date.getDay()];
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
  let month = months[date.getMonth()];
  let day = date.getDate();

  return `${weekDay}, ${month} ${day}`;
}

function displayTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//date and time still not working properly. what about eg Australia? Also time is wrong, always behind when updated

function changeCurrentTemp(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date").innerHTML = displayDate(
    response.data.dt * 1000
  );
  document.querySelector("#time").innerHTML = displayTime(
    response.data.dt * 1000
  );
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
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
  celsiusIcon.classList.remove("active");
  fahrenheitIcon.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function clickCelsius(event) {
  event.preventDefault();
  celsiusIcon.classList.add("active");
  fahrenheitIcon.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
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

let celsiusTemperature = null;

let searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", changeCity);

let fahrenheitIcon = document.querySelector("#fahrenheit");
fahrenheitIcon.addEventListener("click", clickFahrenheit);

let celsiusIcon = document.querySelector("#celsius");
celsiusIcon.addEventListener("click", clickCelsius);

search("Lisbon");
