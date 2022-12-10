const domElements = {
  search: document.querySelector('.search'),
  location: document.querySelector('.location'),
  clock: document.querySelector('.time'),
  temp: document.querySelector('.temp'),
  feelsLike: document.querySelector('.feels-like'),
  high: document.querySelector('.high-temp'),
  low: document.querySelector('.low-temp'),
  weather: document.querySelector('.weather'),
  windSpeed: document.querySelector('.wind-speed'),
};

function callWeatherAPI(location) {
  function display(weather) {
    domElements.location.innerText = `Location: ${weather.location}`;
    domElements.clock.innerText = `Time: ${weather.time}`;
    domElements.temp.innerText = `Current Temperature: ${weather.temperature}`;
    domElements.feelsLike.innerText = `Feels Like: ${weather.feelsLike}`;
    domElements.high.innerText = `High: ${weather.high}`;
    domElements.low.innerText = `Low: ${weather.low}`;
    domElements.weather.innerText = `${weather.weather}`;
    domElements.windSpeed.innerText = `Wind speed ${weather.windSpeed} km/h`;
  }
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=ec1daa1f6ce8bb961a208463e5e93d64&units=metric`, {
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
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
