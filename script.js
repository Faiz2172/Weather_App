document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_KEY = "85ae9b277cd928ab9cfc07ed63122112";//this was a temporary api key.You have to edit this using your api_key.....

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();  // Fix: Corrected the way input value is fetched
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        // Fetch weather data from API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather data not found");
        }

        return await response.json();
    }

    function displayWeatherData(weatherData) {
        weatherInfo.classList.remove('hidden');  // Show weather info
        errorMessage.classList.add('hidden');  // Hide error message

        cityNameDisplay.textContent = weatherData.name;
        temperatureDisplay.textContent = `${weatherData.main.temp}°C`;
        descriptionDisplay.textContent = weatherData.weather[0].description;
    }

    function showError() {
        weatherInfo.classList.add('hidden');  // Hide weather info
        errorMessage.classList.remove('hidden');  // Show error message
        errorMessage.textContent = "City not found. Please try again.";
    }
});
