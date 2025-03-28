
const API_KEY=  "a0e3f6f510697cf3399b5d067d27b2b2"// this key is private
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

//selecting elements from the DOM
const searchButton = document.querySelector(".search button");
const cityInput = document.getElementById("city-input");
const temperatureElement = document.querySelector(".temp");
const cityNameElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windSpeedElement = document.querySelector(".windy");
const weatherIconElement = document.createElement("img");//new weather icon
const weatherInfo = document.querySelector(".weather-info");//handle error
//function to fetch weather data
    async function  fetchWeather(city){
        console.log("Fetching weather data for:", city);//debug log 
     try{
        const response =await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        console.log("Response received:", response);//check response
        if (!response.ok ){
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log("Fetched Weather Data", data);//testing in the console for fetched data
        return data;//ensure function returns data
        
//updating the UI with fetched weather data
        
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        showError("City not found.please enter a valid city name");
     }
}
    fetchWeather("London").then(updateWeatherUI);//test  call function
//function to update weather UI
        function updateWeatherUI(data){
            if(!data)return;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            cityNameElement.textContent = data.name;
            humidityElement.textContent = `${data.main.humidity}%`;
            windSpeedElement.textContent = `${data.wind.speed} km/h`;
        
 // Update the weather icon dynamically
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            console.log("Updating main weather icon to:", iconUrl)//debugging log
            //append the existing image 
            let existingIcon = weatherInfo.querySelector(".weather-icon");
            if (!existingIcon) {
                existingIcon = document.createElement("img");
                existingIcon.classList.add("weather-icon");
                weatherInfo.appendChild(existingIcon);
            }
            
            existingIcon.src = iconUrl;
            existingIcon.alt = data.weather[0].description;
        }
        
 //adding event listener for the search buton
        searchButton.addEventListener("click", async () => {
            console.log("Search button clicked!");//debug log
            const city = cityInput.value.trim();
            console.log("City input:", city); //check input value
            if (city){
                //fetch and update current weather 
                const weatherData = await fetchWeather(city);
                if(weatherData){
                    updateWeatherUI(weatherData);
                }
                // Fetch and update forecast
        const forecastData = await fetchForecast(city);
        if (forecastData) {
            displayForecast(forecastData);
        }
            } else {
                alert("Please enter a city name.");
            }
        });
 //adding event listener for the search key
            cityInput.addEventListener("keypress", (event) =>{
                if(event.key === "Enter"){
                    searchButton.click();
                }
            })
  //show error message if a city is not found
            function showError(message){
                console.log("Error message displayed:", message); //debbug log
                cityNameElement.textContent = message;
                temperatureElement.textContent ="--°C";
                humidityElement.textContent ="---%";
                windSpeedElement.textContent ="---km/hr";
            }
        //add mouseover event listener 
        document.getElementById("city-input");

         cityInput.addEventListener("mouseover", function () {
         cityInput.style.backgroundColor = "#2596be"; // Light gray highlight
});
         cityInput.addEventListener("mouseout", function () {
        cityInput.style.backgroundColor = ""; // Reset background
});
async function fetchForecast(city) {
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    
    try {
        console.log("Fetching forecast data for:", city);//debug log
        const response = await fetch(FORECAST_URL);
        console.log("Response receive", response);//debug log

        if (!response.ok) {
            throw new Error("Forecast data not found");
        }

        const data = await response.json();
        console.log("Fetched Forecast Data:", data); // Debugging log
        return data;
    } catch (error) {
        console.error("Error fetching forecast data:", error.message);
        return null;
    }
}
//displa Forecast data
function displayForecast(forecastData) {
    const forecastContainer = document.querySelector(".forecast-list");
    forecastContainer.innerHTML = ""; // Clear old forecast

    if (!forecastData || !forecastData.list) {
        forecastContainer.innerHTML = "<p>Forecast data unavailable</p>";
        return;
    }
    console.log("Forecast Data:", forecastData);

    // Extract 3 days of forecast (every 8th index = ~24 hours apart)
    for (let i = 0; i < forecastData.list.length; i += 8) {
        const day = forecastData.list[i];

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");
        forecastCard.innerHTML = `
            <h3>${new Date(day.dt * 1000).toLocaleDateString()}</h3>
            <p>Temp: ${Math.round(day.main.temp)}°C</p>
            <p>Condition: ${day.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" 
                 alt="${day.weather[0].description}">
        `;

        forecastContainer.appendChild(forecastCard);
    }
}

        
   

        
        
