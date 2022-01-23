//set universal variables
var searchEl = document.getElementById("search-button");
var inputEl = document.getElementById("city-input");
var nameEl = document.getElementById("city-name");
var currentTempEl = document.getElementById("temp");
var currentWindEl = document.getElementById("wind");
var currentHumidityEl = document.getElementById("humidity");
var currentUVEl = document.getElementById("UVindex");

//Set API Key
var APIKey = "3cc44ada90359f6c6afd5b1ee99eaa7d";

//Link to Retrieve the Weather Data from the Open Weather API
function getWeather(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
    
    //Return GetWeather Function as a Promise
    return fetch(queryURL)
    .then(function(response) {
        console.log(response);
        return response.json();
    });
}

//Link to Retrieve the UVI Data from the One Call API
function UVQuery(lat, lon) {
    var UVqueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;

    return fetch(UVqueryURL)
    .then(function(response) {
        return response.json();
    });
}

//Covert Kelvin to Fahrenheit
function ktof(K) {
    return Math.floor((K - 273.15) *1.8 + 32);
}

//Conver Kelvin to Celsius
function ktoc(K) {
    return Math.floor(K - 273.15);
}

//Initiate the Search of the Targeted City
searchEl.addEventListener('click', function(event) {
    event.preventDefault();
    var cityName = inputEl.value;
//Get the Current Weather Data of the Targeted City
    getWeather(cityName)
       .then(function(data) {
    console.log('data is', data);
    nameEl.innerHTML = data.name // + (month/day/year) with format (1/23/2022);
    currentTempEl.innerHTML = "Temp: " + ktof(data.main.temp).toFixed(2) + " &#176F" + "／" + ktoc(data.main.temp).toFixed(2) + " &#176C";
    currentWindEl.innerHTML = "Wind: " + data.wind.speed + " MPH";
    currentHumidityEl.innerHTML = "Humidity: " + data.main.humidity + " %";

//Call UVQuery function to Retrieve the UV data from the One Call API 
    return UVQuery(data.coord.lat, data.coord.lon)
   


}).then(function(UVIdata){
    // UV Index Color (*remove color from UV Index by creating a span for the UV value) 
    // Low 0 - 2 Green
    // Moderate 3 - 5 Yellow
    // High 6-7 Orange
    // Very High 8-10 Red
    var currentUVI = UVIdata.current.uvi;
    currentUVEl.innerHTML = "UV Index: " + currentUVI;

if(currentUVI < 3) {
    currentUVEl.setAttribute('class', 'green')
}
if (currentUVI >= 3 && currentUVI <= 5) {
    currentUVEl.setAttribute('class', 'yellow')
}
if (currentUVI >= 6 && currentUVI <= 7) {
    currentUVEl.setAttribute('class', 'orange')
}
if (currentUVI > 7) {
    currentUVEl.setAttribute('class', 'red')
}
})
;


})

