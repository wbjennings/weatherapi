// declare api key from weather api and the url here as consts
const API_KEY = 'f264e8097b8b2471d6aa78e2527a7254';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// makee connections to HTML elements
const zipInput = document.getElementById('zip-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherInfo = document.getElementById('weather-info');

// Add event listener to the button
getWeatherBtn.addEventListener('click', getWeather);

// Function to fetch weather data gets user input for zip code
function getWeather() {
  const zipCode = zipInput.value;

  if (!zipCode) {
    weatherInfo.innerHTML = 'Please enter a ZIP code.';
    return;
  }

  const url = `${API_URL}?zip=${zipCode}&appid=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        weatherInfo.innerHTML = 'Invalid ZIP code'; //error checking if invalid zip
      } else {
        displayWeather(data);
      }
    })
    .catch(error => {
      console.log(error);
      weatherInfo.innerHTML = 'An error occurred'; //handles other invalid errors
    });
};

// Function to display weather data
function displayWeather(data) {
  const cityName = data.name;
  const temperatureHigh = convertKelvinToFahrenheit(data.main.temp_max);
  const temperatureLow = convertKelvinToFahrenheit(data.main.temp_min);
  const weatherDescription = data.weather[0].description;
  const humidity = data.main.humidity;

  const weatherHTML = `
    <h2>${cityName}</h2>
    <p>High: ${temperatureHigh}°F</p>
    <p>Low: ${temperatureLow}°F</p>
    <p>Forecast: ${weatherDescription}</p>
    <p>Humidity: ${humidity}%</p>
  `; //populates the html page with the information from the user inputted zip code.

  weatherInfo.innerHTML = weatherHTML;
};

// Function to convert Kelvin to Fahrenheit called upon in displayWeather
function convertKelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(1);
};