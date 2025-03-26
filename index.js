
const API_KEY= "a0e3f6f510697cf3399b5d067d27b2b2";//this key is private 
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
        nsole.log("Response received:", response);//check response
        if (!response.ok ){
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log("Fetched Weather Data", data);//testing in the console for fetched data
        return data();//ensure function returns data
        
//updating the UI with fetched weather data
        
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        showError("City not found.please enter a valid city name");
    }
    }
    fetchWeather("London");//test function
//funcyion to update weather UI
        function updateWeatherUI(data){
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            cityNameElement.textContent = data.name;
            humidityElement.textContent = `${data.main.humidity}%`;
            windSpeedElement.textContent = `${data.wind.speed} km/h`;
        }
//update the weather icon dynamically
            const iconCode = data.weather[0].icon;
            weatherIconElement.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
            weatherIconElement.alt = data.weather[0].description;
//append icon  only if its not in the DOM
           if(weatherInfo.contains(weatherIconElement)) {
                weatherInfo.appendChild(weatherIconElement);
            }
        

 //adding event listener for the search buton
        searchButton.addEventListener("click",() => {
            console.log("Search button clicked!");//debug log
            const city = cityInput.value.trim();
            console.log("City input:", city); //check input value
            if (city){
                fetchWeather(city);
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
        
        
        
