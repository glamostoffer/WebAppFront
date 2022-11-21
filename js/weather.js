const app = document.querySelector('.weather_app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloud = document.querySelector('.cloud');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const form = document.getElementById('location_input');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "Moscow";

cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = '0';
  });
});

form.addEventListener('submit', (e) => {
  if(search.value.length === 0) {
    alert('Please, type in a city name');
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = '';
    app.style.opacity = '0';
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

function fetchWeatherData() {
  let promise = fetch(`http://api.weatherapi.com/v1/current.json?key=625fa2199bfd4e4db20210505221511&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      temp.innerHTML = Math.trunc(data.current.temp_c)+ '&#176;';
      // console.log(data.current.condition.text);
      conditionOutput.innerHTML = data.current.condition.text;
      const date = data.location.localtime;
      console.log(date);
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);
      console.log(time, `${y}/${m}/${d}`);
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;

      let iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);
      console.log(iconId);
      icon.src = "img/icons" + iconId;

      cloud.innerHTML = data.current.cloud + '%';
      humidity.innerHTML = data.current.humidity + '%';
      wind.innerHTML = data.current.wind_kph + "km/h";

      let timeOfDay = "day";
      const code = data.current.condition.code;
      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      console.log(code);
      if (code === 1000) {
        app.style.backgroundImage = `url("../img/${timeOfDay}/clear.png")`;
      } else if (
        code === 1003 ||
        code === 1006 ||
        code === 1009 ||
        code === 1030 ||
        code === 1069 ||
        code === 1087 ||
        code === 1135 ||
        code === 1273 ||
        code === 1276 ||
        code === 1279 ||
        code === 1282
      ) {
        app.style.backgroundImage = `url("../img/${timeOfDay}/cloudy.png")`;
      } else if (
        code === 1063 ||
        code === 1069 ||
        code === 1072 ||
        code === 1150 ||
        code === 1153 ||
        code === 1180 ||
        code === 1183 ||
        code === 1186 ||
        code === 1189 ||
        code === 1192 ||
        code === 1195 ||
        code === 1204 ||
        code === 1207 ||
        code === 1240 ||
        code === 1243 ||
        code === 1246 ||
        code === 1249 ||
        code === 1252
      ) {
        app.style.backgroundImage = `url("img/${timeOfDay}/rainy.png"`;
      }
      else {
        app.style.backgroundImage = `url("img/${timeOfDay}/snowy.png"`;
      }
      app.style.opacity = "1";
    })

    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
}

fetchWeatherData();
app.style.opacity = "1";
