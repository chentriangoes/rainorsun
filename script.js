//set universal variables
var searchEl = document.getElementById("search-button");
var inputEl = document.getElementById("city-input");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
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
    var currentDate = new Date(data.dt*1000);
    console.log(currentDate);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    nameEl.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") ";
    var weatherPic = data.weather[0].icon;
    console.log(weatherPic);
    currentPicEl.setAttribute("src","http://openweathermap.org/img/w/" + weatherPic + ".png");
    currentPicEl.setAttribute("alt", data.weather[0].description);
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

if (currentUVI < 3) {
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

//5 Days Forecast
// Day 1 Data
var date1El = document.getElementById("date1");
var icon1El = document.getElementById("icon1");
var temp1El = document.getElementById("temp1");
var wind1El = document.getElementById("wind1");
var humidity1El = document.getElementById("humidity1");
var day1date = new Date(UVIdata.daily[1].dt * 1000);
var forecastDay1 = day1date.getDate();
var forecastMonth1 = day1date.getMonth() + 1;
var forecastYear1 = day1date.getFullYear();
var day1icon = UVIdata.daily[1].weather[0].icon;
var day1Temp = UVIdata.daily[1].temp.day;
var day1Wind = UVIdata.daily[1].wind_speed;
var day1Humidity = UVIdata.daily[1].humidity;

date1El.innerHTML = forecastMonth1 + "/" + forecastDay1 + "/" + forecastYear1;
icon1El.setAttribute("src", "http://openweathermap.org/img/w/" + day1icon + ".png")
temp1El.innerHTML = "Temp: " + ktof(day1Temp).toFixed(2) + " &#176F" + "／" + ktoc(day1Temp).toFixed(2) + " &#176C";
wind1El.innerHTML = "Wind: " + day1Wind + " MPH";
humidity1El.innerHTML = "Humidity: " + day1Humidity + " %";

// Day 2 Data
var date2El = document.getElementById("date2");
var icon2El = document.getElementById("icon2");
var temp2El = document.getElementById("temp2");
var wind2El = document.getElementById("wind2");
var humidity2El = document.getElementById("humidity2");
var day2date = new Date(UVIdata.daily[2].dt * 1000);
var forecastDay2 = day2date.getDate();
var forecastMonth2 = day2date.getMonth() + 1;
var forecastYear2 = day2date.getFullYear();
var day2icon = UVIdata.daily[2].weather[0].icon;
var day2Temp = UVIdata.daily[2].temp.day;
var day2Wind = UVIdata.daily[2].wind_speed;
var day2Humidity = UVIdata.daily[2].humidity;

date2El.innerHTML = forecastMonth2 + "/" + forecastDay2 + "/" + forecastYear2;
icon2El.setAttribute("src", "http://openweathermap.org/img/w/" + day2icon + ".png")
temp2El.innerHTML = "Temp: " + ktof(day2Temp).toFixed(2) + " &#176F" + "／" + ktoc(day2Temp).toFixed(2) + " &#176C";
wind2El.innerHTML = "Wind: " + day2Wind + " MPH";
humidity2El.innerHTML = "Humidity: " + day2Humidity + " %";

// Day 3 Data  
var date3El = document.getElementById("date3");
var icon3El = document.getElementById("icon3");
var temp3El = document.getElementById("temp3");
var wind3El = document.getElementById("wind3");
var humidity3El = document.getElementById("humidity3");
var day3date = new Date(UVIdata.daily[3].dt * 1000);
var forecastDay3 = day3date.getDate();
var forecastMonth3 = day3date.getMonth() + 1;
var forecastYear3 = day3date.getFullYear();
var day3icon = UVIdata.daily[3].weather[0].icon;
var day3Temp = UVIdata.daily[3].temp.day;
var day3Wind = UVIdata.daily[3].wind_speed;
var day3Humidity = UVIdata.daily[3].humidity;

date3El.innerHTML = forecastMonth3 + "/" + forecastDay3 + "/" + forecastYear3;
icon3El.setAttribute("src", "http://openweathermap.org/img/w/" + day3icon + ".png")
temp3El.innerHTML = "Temp: " + ktof(day3Temp).toFixed(2) + " &#176F" + "／" + ktoc(day3Temp).toFixed(2) + " &#176C";
wind3El.innerHTML = "Wind: " + day3Wind + " MPH";
humidity3El.innerHTML = "Humidity: " + day3Humidity + " %";

// Day 4 Data 
var date4El = document.getElementById("date4");
var icon4El = document.getElementById("icon4");
var temp4El = document.getElementById("temp4");
var wind4El = document.getElementById("wind4");
var humidity4El = document.getElementById("humidity4");
var day4date = new Date(UVIdata.daily[4].dt * 1000);
var forecastDay4 = day4date.getDate();
var forecastMonth4 = day4date.getMonth() + 1;
var forecastYear4 = day4date.getFullYear();
var day4icon = UVIdata.daily[4].weather[0].icon;
var day4Temp = UVIdata.daily[4].temp.day;
var day4Wind = UVIdata.daily[4].wind_speed;
var day4Humidity = UVIdata.daily[4].humidity;

date4El.innerHTML = forecastMonth4 + "/" + forecastDay4 + "/" + forecastYear4;
icon4El.setAttribute("src", "http://openweathermap.org/img/w/" + day4icon + ".png")
temp4El.innerHTML = "Temp: " + ktof(day4Temp).toFixed(2) + " &#176F" + "／" + ktoc(day4Temp).toFixed(2) + " &#176C";
wind4El.innerHTML = "Wind: " + day4Wind + " MPH";
humidity4El.innerHTML = "Humidity: " + day4Humidity + " %";

// Day 5 Data    
var date5El = document.getElementById("date5");
var icon5El = document.getElementById("icon5");
var temp5El = document.getElementById("temp5");
var wind5El = document.getElementById("wind5");
var humidity5El = document.getElementById("humidity5");
var day5date = new Date(UVIdata.daily[5].dt * 1000);
var forecastDay5 = day5date.getDate();
var forecastMonth5 = day5date.getMonth() + 1;
var forecastYear5 = day5date.getFullYear();
var day5icon = UVIdata.daily[5].weather[0].icon;
var day5Temp = UVIdata.daily[5].temp.day;
var day5Wind = UVIdata.daily[5].wind_speed;
var day5Humidity = UVIdata.daily[5].humidity;

date5El.innerHTML = forecastMonth5 + "/" + forecastDay5 + "/" + forecastYear5;
icon5El.setAttribute("src", "http://openweathermap.org/img/w/" + day5icon + ".png")
temp5El.innerHTML = "Temp: " + ktof(day5Temp).toFixed(2) + " &#176F" + "／" + ktoc(day5Temp).toFixed(2) + " &#176C";
wind5El.innerHTML = "Wind: " + day5Wind + " MPH";
humidity5El.innerHTML = "Humidity: " + day5Humidity + " %";
});

//Set Local Storage
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