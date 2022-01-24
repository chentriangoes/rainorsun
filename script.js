//set universal variables
var searchEl = document.getElementById("search-button");
var inputEl = document.getElementById("city-input");
var nameEl = document.getElementById("city-name");
var currentTempEl = document.getElementById("temp");
var currentWindEl = document.getElementById("wind");
var currentHumidityEl = document.getElementById("humidity");
var currentUVEl = document.getElementById("UVindex");
var historyEl = document.getElementById("history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var clearEl = document.getElementById("clear-history");

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
    return UVQuery(data.coord.lat, data.coord.lon);
   
}).then(function(UVIdata){
    // UV Index Color (*remove color from UV Index by creating a span for the UV value) 
    // Low 0 - 2 Green
    // Moderate 3 - 5 Yellow
    // High 6-7 Orange
    // Very High 8-10 Red
    var currentUVI = UVIdata.current.uvi;
    var uviValue = document.createElement("span");
    uviValue.innerHTML = currentUVI;
    currentUVEl.innerHTML = "UV Index: ";
    currentUVEl.appendChild(uviValue);


if(currentUVI < 3) {
    uviValue.setAttribute('class', 'green')
}
if (currentUVI >= 3 && currentUVI <= 5) {
    uviValue.setAttribute('class', 'yellow')
}
if (currentUVI >= 6 && currentUVI <= 7) {
    uviValue.setAttribute('class', 'orange')
}
if (currentUVI > 7) {
    uviValue.setAttribute('class', 'red')
}

// Day 1 data of the 5 days forecast    
var date1El = document.getElementById("date1");
var icon1El = document.getElementById("icon1");
var temp1El = document.getElementById("temp1");
var wind1El = document.getElementById("wind1");
var humidity1El = document.getElementById("humidity1");
var day1date = UVIdata.daily[1].dt * 1000;
var day1icon = UVIdata.daily[1].weather[0].icon;
var day1Temp = UVIdata.daily[1].temp.day;
var day1Wind = UVIdata.daily[1].wind_speed;
var day1Humidity = UVIdata.daily[1].humidity;
console.log(day1date);
console.log(day1icon);
console.log(day1Temp);
console.log(day1Wind);
console.log(day1Humidity);
date1El.innerHTML = day1date;
temp1El.innerHTML = "Temp: " + ktof(day1Temp).toFixed(2) + " &#176F" + "／" + ktoc(day1Temp).toFixed(2) + " &#176C";
wind1El.innerHTML = "Wind: " + day1Wind + " MPH";
humidity1El.innerHTML = "Humidity: " + day1Humidity + " %";
icon1El.innerHTML = day1icon; //get the icon out!
});

   var searchTerm = inputEl.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();

    clearEl.addEventListener("click",function() {
        searchHistory = [];
        renderSearchHistory();
    })

    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i=0; i<searchHistory.length; i++) {
            var historyItem = document.createElement("input");
            // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function() {
                getWeather(historyItem.value);
            })
            historyEl.appendChild(historyItem);
        }
    };

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    };

})


//function foreCast (date, icon, temp, humidity, wind){

//   var forecastEls = document.querySelectorAll(".forecast");

//    forecastEls[i].innerHTML = "";
//    var forecastIndex = i*8 + 4;
//    var forecastTempEl = document.createElement("p");
//    forecastTempEl.innerHTML = "Temp: " + ktof(data.list[forecastIndex].main.temp) + " &#176F";
    //currentTempEl.innerHTML = "Temp: " + ktof(data.main.temp).toFixed(2) + " &#176F" + "／" + ktoc(data.main.temp).toFixed(2) + " &#176C";
//    forecastEls[i].appendChild(forecastTempEl);
//return col;
//}

//var fiveDays = UVIdata.daily.slice(0, 5);


//forecastCards.textContent = "";
//for (let index = 0; index<fiveDays.length; index++){
//    var nnn = fiveDays[index];
//use moment to convert unix into human time

//    var col = createWeatherCol(nnn.dt, '', forecast.temp.day);

//    forecastCards.appendChild(col);
//}
