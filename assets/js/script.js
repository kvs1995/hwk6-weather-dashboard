
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
        currentTimeEl.textContent = moment().format("h:mm:ss a")
        sunriseEl.textContent = "Sunrise: " + moment(weatherData.sys.sunrise, "X").format("h:mm a")
        sunsetEl.textContent = "Sunset: " + moment(weatherData.sys.sunset, "X").format("h:mm a")
        
        highEl.textContent = 'High: '+ convertTemp(weatherData.main.temp_max) + '\u00B0 F'
        lowEl.textContent = 'Low: ' + convertTemp(weatherData.main.temp_min) + '\u00B0 F'
        var coordinates = [weatherData.coord.lon, weatherData.coord.lat]
        // fetchData(weatherData.coord.lon,  weatherData.coord.lat)
        return coordinates

    }) 
    .then(function(coordinates) {
        var cityLongitude = coordinates[0]
        var cityLatitude = coordinates[1]
        console.log(cityLongitude)

        var apiKey = '410bf7cb489396d2d3451160359de4e0'
        var oneCallRequestURL='https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLatitude + '&lon=' + cityLongitude +  "&dt=" + moment() +'&appid=' + apiKey
        fetch(oneCallRequestURL) 
            .then(function(response) {
                return response.json();
            })
            .then(function(oneCallWeatherData) {

                var currentDegreeEl = document.querySelector('#current-degree')
                var currentWindEl= document.querySelector('#current-wind')
                var currentHumidityEl = document.querySelector('#current-humidity')
                var currentUVIndexEl= document.querySelector('#current-uv-index')
                var weatherIconEl = document.querySelector('#current-icon')
                var iconURL = 'http://openweathermap.org/img/w/' + oneCallWeatherData.current.weather[0].icon + '.png'
                // console.log(iconURL)
                weatherIconEl.setAttribute('src',iconURL)


                currentDegreeEl.textContent = 'Temp: ' + convertTemp(oneCallWeatherData.current.temp) + '\u00B0 F'
                currentWindEl.textContent  = 'Wind: ' +  oneCallWeatherData.current.wind_speed +' mph'
                currentHumidityEl.textContent  = 'Humidity: ' + oneCallWeatherData.current.humidity
                currentUVIndexEl.textContent  = 'UV Index: ' + oneCallWeatherData.current.uvi
        

                //////////////////////FORECASTED DAYS//////////////////////
                var cardsEl=document.querySelector('.cards')
                // console.log(cardsEl)
                function setAttributeHelperFunction(targetEl, attributes){
                    for (var keys in attributes) {
                        targetEl.setAttribute(keys, attributes[keys])
                    }};

                // console.log("hit line 157")
                //for each element, execute set Attribute for each attribute
                for (var i=0; i<5; i++) {
                    var forecastDateEl = document.createElement('h5'); 
                    var forecastTempEl = document.createElement('div');
                    var forecastDegreeEl = document.createElement('p');
                    var forecastIconEl = document.createElement('img');
                    var forecastWindEl = document.createElement('p');
                    var forecastHumidityEl = document.createElement('p');
                    var forecastUVIndexEl = document.createElement('p');
                    var forecastElList = [forecastDateEl,forecastTempEl,forecastDegreeEl,forecastIconEl,forecastWindEl,forecastHumidityEl,forecastUVIndexEl]
                    var forecastTypeList = ["date","temp","degree","icon","wind","humidity","uv-index"]

                    // console.log("hit line 168")
                    for (var j=0; j<forecastElList.length; j++) {
                        var forecastClassName = "forecast-"+forecastTypeList[j]
                        forecastElList[j].setAttribute("class",forecastClassName)
                        if (forecastTypeList[j] === "icon"){
                            var altContent = "Forecast Weather Icon: Day " + (i+1).toString();
                            var iconURL = 'http://openweathermap.org/img/w/' + oneCallWeatherData.daily[i].weather[0].icon + '.png'
                            forecastElList[j].setAttribute("src", iconURL)
                            forecastElList[j].setAttribute("alt", altContent)
                        }
                    }
                    // console.log(i)
                    // "X").format("h:mm a")
                    // convertTemp(oneCallWeatherData.daily[i].temp)
                    var forecastWeatherData = {
                        "date": moment(oneCallWeatherData.daily[i].dt, "X").format("MMM Do, YYYY"),
                        "degree": convertTemp(oneCallWeatherData.daily[i].temp.day), 
                        "wind": oneCallWeatherData.daily[i].wind_speed,
                        "humidity": oneCallWeatherData.daily[i].humidity,
                        "uvindex": oneCallWeatherData.daily[i].uvi,
                    }
                    // var momentDate = moment(forecastWeatherData.date, "X").format("MMMM Do, YYYY")
                    // console.log(momentDate)
                    // console.log(momentDate)
                    // for (var k=0; k<forecastWeatherData.length; k++) {
                    //     for (var m=0; m<forecastTypeList.length; m++) {
                    //         if (forecastWeatherData[k] == forecastTypeList[m]) {
                    //             var targetValEl = forecastWeatherData[k].value
                    //             var targetEl = 'forecast' + forecastTypeList[m] + 'El'
                    //             targetEl.textContent = targetValEl 
                    //             console.log(targetEl)
                    //         }
                    //     }
                    
                    // }
                    

                    forecastDateEl.textContent = forecastWeatherData.date
                    forecastDegreeEl.textContent = forecastWeatherData.degree + ' \u00B0F'
                    forecastWindEl.textContent = forecastWeatherData.wind
                    forecastHumidityEl.textContent = forecastWeatherData.humidity
                    forecastUVIndexEl.textContent = forecastWeatherData.uvindex
                    forecastTempEl.append(forecastDegreeEl, forecastIconEl)
                    // forecastDegreeEl.append(forecastIconEl)
                    cardsEl.append(forecastDateEl,forecastTempEl,forecastWindEl,forecastHumidityEl,forecastUVIndexEl)



                    
                }
            })
    })

}

searchButtonEl.addEventListener('click', initialFetchData)
searchButtonEl.addEventListener('click', addHistory)
// function fetchData(longitude, latitude) {
//     var cityLongitude = longitude
//     var cityLatitude = latitude
//     console.log(cityLongitude)
//     var apiKey = '410bf7cb489396d2d3451160359de4e0'
//     var requestURL='https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLatitude + '&lon=' + cityLongitude + '&appid=' + apiKey
//     console.log(requestURL)

//     fetch(requestURL) 
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(weatherData) {

//         var currentDegreeEl = document.querySelector('#current-degree')
//         var currentWindEl= document.querySelector('#current-wind')
//         var currentHumidityEl = document.querySelector('#current-humidity')
//         var currentUVIndexEl= document.querySelector('#current-uv-index')
//         var weatherIconEl = document.querySelector('#current-icon')
//         var iconURL = 'http://openweathermap.org/img/w/' + weatherData.current.weather[0].icon + '.png'
//         console.log(iconURL)
//         weatherIconEl.setAttribute('src',iconURL)


//         currentDegreeEl.textContent = 'Temp: ' + convertTemp(weatherData.current.temp) + '\u00B0 F'
//         currentWindEl.textContent  = 'Wind: ' +  weatherData.current.wind_speed +' mph'
//         currentHumidityEl.textContent  = 'Humidity: ' + weatherData.current.humidity
//         currentUVIndexEl.textContent  = 'UV Index: ' +weatherData.current.uvi
 

//         //////////////////////FORECASTED DAYS//////////////////////
//         var forecastCardsEl=document.querySelector('.forecast-cards')

//     })

// 