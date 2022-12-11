const domElements = {
  search: document.querySelector('.search'),
  searchBtn: document.querySelector('.search-btn'),
  location: document.querySelector('.location'),
  clock: document.querySelector('.time'),
  temp: document.querySelector('.temp'),
  feelsLike: document.querySelector('.feels-like'),
  high: document.querySelector('.high-temp'),
  low: document.querySelector('.low-temp'),
  weather: document.querySelector('.weather'),
  windSpeed: document.querySelector('.wind-speed'),
  humidity: document.querySelector('.humidity'),
  image: document.querySelector('.weather-image'),
};

async function callGiphyAPI(weather) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=ZcAbEZ6aH063bzl45kt24wdQlKkVT3HN&s=${weather}`, { mode: 'cors' });
  const gifData = await response.json();
  domElements.image.src = gifData.data.images.original.url;
}

function callWeatherAPI(location) {
  function display(weather) {
    const uppercaseWeather = weather.weather.slice(0, 1).toUpperCase() + weather.weather.slice(1);

    domElements.location.innerText = `Location: ${weather.location}`;
    domElements.clock.innerText = `Time: ${weather.time}`;
    domElements.temp.innerText = `Temperature: ${weather.temperature} °C`;
    domElements.feelsLike.innerText = `Feels Like: ${weather.feelsLike} °C`;
    domElements.high.innerText = `High: ${weather.high} °C`;
    domElements.low.innerText = `Low: ${weather.low} °C`;
    domElements.weather.innerText = `${uppercaseWeather}`;
    domElements.windSpeed.innerText = `Wind speed: ${weather.windSpeed} km/h`;
    domElements.humidity.innerText = `Humidity: ${weather.humidity}%`;
    callGiphyAPI(weather.weather);
  }
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=ec1daa1f6ce8bb961a208463e5e93d64&units=metric`, {
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const date = new Date();
      const hour = date.getHours();
      let minute = date.getMinutes();
      if (minute < 10) {
        minute = `0${minute}`;
      }
      const weather = {
        temperature: response.main.temp,
        feelsLike: response.main.feels_like,
        high: response.main.temp_max,
        low: response.main.temp_min,
        weather: response.weather[0].description,
        windSpeed: response.wind.speed,
        windGusts: response.wind.gust,
        location: `${response.name}, ${response.sys.country}`,
        time: `${hour}:${minute}`,
        humidity: response.main.humidity,
      };
      return weather;
    })
    .then((weather) => {
      display(weather);
    })
    .catch((err) => {
      console.error(err);
    });
}

callWeatherAPI('Kingston,CA');

function search() {
  callWeatherAPI(domElements.search.value);
}
domElements.searchBtn.addEventListener('click', search, false);
