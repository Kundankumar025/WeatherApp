document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const humidityDisplay = document.getElementById("humidity");
    const windSpeedDisplay = document.getElementById("wind-speed");
    const errorMessage = document.getElementById("error-message");
    const getWeatherBtn = document.getElementById("getWeatherBtn"); // Add id to button in HTML

    const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e";

    getWeatherBtn.addEventListener("click", async function () {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        const { name, main, weather, wind } = data;

        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
        humidityDisplay.textContent = `Humidity: ${main.humidity}%`;
        windSpeedDisplay.textContent = `Wind Speed: ${ data.wind.speed} m/s`;

        // Show weather, hide error
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});
