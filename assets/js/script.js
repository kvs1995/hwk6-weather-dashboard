
// //get access to the input field 
// var cityInputEl = document.querySelector('#city')

// //get access to the button
// var button = document.querySelector('#search')

// //create function to convert to Fahrenheit
// function convertTemp(temp) {
//     return Math.floor(((temp)-273.15) * (9/5) + 32)
// }

// //create function to fetch api button when button is click
// function fetchData() {
//     console.log(cityInputEl.value)
//     var cityName = cityInputEl.value
//     var apiKey = '410bf7cb489396d2d3451160359de4e0'
//     var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey 
//    console.log(requestURL)

//    fetch(requestURL)
//    .then(function(response) {
//        return response.json();
//    })
//    .then(function(weatherData) {
//        var cityNameEl = document.createElement('h2');
//        var temp = document.createElement('p');
//        var wind = document.createElement('p');
//        var humidity = document.createElement('p');
//        var uvIndex = document.createElement('p');
//         weatherDataList = [cityNameEl,temp, wind, humidity, uvIndex]
//         cityNameEl.textContent = weatherData.sys.name
//         console.log(cityNameEl)
//        temp.textContent = 'Temp: ' + convertTemp(weatherData.main.temp) + '\u00B0 F'
//        wind.textContent  = 'Wind: ' +  weatherData.wind.speed +' mph'
//        humidity.textContent  = 'Humidity: ' + weatherData.main.humidity
//        uvIndex.textContent  = 'UV Index: '

//         for (var i=0; i < weatherDataList.length; i++) {
//             document.body.children[1].children[1].children[0].append(weatherDataList[i])        
//         }
//    })
// }

// button.addEventListener('click',fetchData)
// const moment = require('moment')

var cityInputEl = document.querySelector('#city')
/////////////////// SEARCH HISTORY FUNCTIONALITY /////////////////////

//when I search for a city in the input form field and click the button, the data is fetched from the URl with the filter. 



//get access to the button 
var searchButtonEl = document.querySelector('#search')



//when the button to search is selected, that city is added to the search history as a button to go back to

//grab where the city history will be added to
var searchHistoryEl = document.querySelector('.search-history')

function addHistory () {
    console.log(cityInputEl.value)
    var cityName = cityInputEl.value

    //create button to add into search-history
    var historyButton = document.createElement('button');
    historyButton.setAttribute('type','button')
    historyButton.setAttribute('class', 'history-button')
    historyButton.textContent = cityName
    searchHistoryEl.prepend(historyButton)
    cityInputEl.value=''
}

//////////////////////////// FETCH API DATA FUNCTION ////////////////


//create function to convert to Fahrenheit
function convertTemp(temp) {
    return Math.floor(((temp)-273.15) * (9/5) + 32)
}

//create function to fetch api button when button is click
function initialFetchData() {
    // console.log(cityInputEl.value)
    var cityName = cityInputEl.value

    var apiKey = '410bf7cb489396d2d3451160359de4e0'
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey 
//    console.log(requestURL)

   fetch(requestURL)
   .then(function(response) {
       return response.json();
   })
   .then(function(weatherData) {
        var currentCityEl = document.querySelector('.current-title')
        var highEl = document.querySelector('#high')
        var lowEl = document.querySelector('#low')
        var currentDateEl = document.querySelector('#current-date')
        var currentTimeEl = document.querySelector('#current-time')
        var sunriseEl = document.querySelector('#sunrise')
        var sunsetEl=document.querySelector('#sunset')
        currentCityEl.textContent = cityName
        currentDateEl.textContent = moment().format("MMMM Do, YYYY")
        currentTimeEl.textContent = moment().format("hh:mm:ss A")
        sunriseEl.textContent = moment(weatherData.sys.sunrise, "x").format("h:mm A")
        sunsetEl.textContent = moment(weatherData.sys.sunset, "x").format("h:mm A")
        
        highEl.textContent = 'High: '+ convertTemp(weatherData.main.temp_max) + '\u00B0 F'
        lowEl.textContent = 'Low: ' + convertTemp(weatherData.main.temp_min) + '\u00B0 F'
        fetchData(weatherData.coord.lon,  weatherData.coord.lat)


    })

}


function fetchData(longitude, latitude) {
    var cityLongitude = longitude
    var cityLatitude = latitude
    console.log(cityLongitude)
    var apiKey = '410bf7cb489396d2d3451160359de4e0'
    var requestURL='https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLatitude + '&lon=' + cityLongitude + '&appid=' + apiKey
    console.log(requestURL)

    fetch(requestURL) 
    .then(function(response) {
        return response.json();
    })
    .then(function(weatherData) {

        var currentDegreeEl = document.querySelector('#current-degree')
        var currentWindEl= document.querySelector('#current-wind')
        var currentHumidityEl = document.querySelector('#current-humidity')
        var currentUVIndexEl= document.querySelector('#current-uv-index')
        var weatherIconEl = document.querySelector('#current-icon')
        var iconURL = 'http://openweathermap.org/img/w/' + weatherData.current.weather[0].icon + '.png'
        console.log(iconURL)
        weatherIconEl.setAttribute('src',iconURL)


        currentDegreeEl.textContent = 'Temp: ' + convertTemp(weatherData.current.temp) + '\u00B0 F'
        currentWindEl.textContent  = 'Wind: ' +  weatherData.current.wind_speed +' mph'
        currentHumidityEl.textContent  = 'Humidity: ' + weatherData.current.humidity
        currentUVIndexEl.textContent  = 'UV Index: ' +weatherData.current.uvi
 
    })

}
searchButtonEl.addEventListener('click', initialFetchData)
searchButtonEl.addEventListener('click', addHistory)




