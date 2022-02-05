

var cityInputEl = document.querySelector('.city')

/////////////////// SEARCH HISTORY FUNCTIONALITY /////////////////////

//when I search for a city in the input form field and click the button, the data is fetched from the URl with the filter. 



//get access to the button 
var searchButtonEl = document.querySelector('#search')
var cardsEl=document.querySelector('.cards')

//////////////////////////// FETCH API DATA FUNCTION ////////////////


//create function to convert to Fahrenheit
function convertTemp(temp) {
    return Math.floor(((temp)-273.15) * (9/5) + 32)
}

//create function to fetch api button when button is click
function fetchData(city) {
    // console.log(city)
    // cardsEl.innerHTML = ''

    var cityName = cityInputEl.value
    var apiKey = '410bf7cb489396d2d3451160359de4e0'
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey 

   fetch(requestURL)

        .then(function(response) {
            return response.json();
        })

        .then(function(weatherData) {

        //////////CREATE ELEMENTS//////////////
            var currentCityEl = document.querySelector('.current-title')
            var highEl = document.querySelector('#high')
            var lowEl = document.querySelector('#low')
            var currentDateEl = document.querySelector('#current-date')
            var currentTimeEl = document.querySelector('#current-time')
            var sunriseEl = document.querySelector('#sunrise')
            var sunsetEl=document.querySelector('#sunset')
            var cityLongitude = weatherData.coord.lon
            var cityLatitude = weatherData.coord.lat
        //////////// SET TEXT CONTENT OF EACH ELEMENT/////////////
            currentCityEl.textContent = cityName
            currentDateEl.textContent = moment().format("MMMM Do, YYYY")
            currentTimeEl.textContent = moment().format("h:mm:ss a")
            sunriseEl.textContent = "Sunrise: " + moment(weatherData.sys.sunrise, "X").format("h:mm a")
            sunsetEl.textContent = "Sunset: " + moment(weatherData.sys.sunset, "X").format("h:mm a")
            highEl.textContent = 'High: '+ convertTemp(weatherData.main.temp_max) + '\u00B0 F'
            lowEl.textContent = 'Low: ' + convertTemp(weatherData.main.temp_min) + '\u00B0 F'

            requestURL='https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLatitude + '&lon=' + cityLongitude +  "&dt=" + moment() +'&appid=' + apiKey

            fetch(requestURL) 

            .then(function(response) {
                return response.json();
            })

            .then(function(forecastData) {

            //*********** CREATE ELEMENTS**********//
            var currentDegreeEl = document.querySelector('#current-degree')
            var currentWindEl= document.querySelector('#current-wind')
            var currentHumidityEl = document.querySelector('#current-humidity')
            var currentUVIndexEl= document.querySelector('#current-uv-index')
            var weatherIconEl = document.querySelector('#current-icon')
            var iconURL = 'http://openweathermap.org/img/w/' + forecastData.current.weather[0].icon + '.png'


            //*********** SET TEXT CONTENT OF EACH ELEMENT************//
            weatherIconEl.setAttribute('src',iconURL)
            currentDegreeEl.textContent = 'Temp: ' + convertTemp(forecastData.current.temp) + '\u00B0 F'
            currentWindEl.textContent  = 'Wind: ' +  forecastData.current.wind_speed +' mph'
            currentHumidityEl.textContent  = 'Humidity: ' + forecastData.current.humidity
            currentUVIndexEl.textContent  = 'UV Index: ' + forecastData.current.uvi


            /////////////////////////FORECASTED DAYS////////////////////////////////

            // console.log(cardsEl)
            function setAttributeHelperFunction(targetEl, attributes){
                for (var keys in attributes) {
                    targetEl.setAttribute(keys, attributes[keys])
                }};

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

                //for each element, assign the class name 'forecast' - type
                for (var j=0; j<forecastElList.length; j++) {
                    var forecastClassName = "forecast-"+forecastTypeList[j]
                    forecastElList[j].setAttribute("class",forecastClassName)
                    if (forecastTypeList[j] === "icon"){
                        var altContent = "Forecast Weather Icon: Day " + (i+1).toString();
                        var iconURL = 'http://openweathermap.org/img/w/' + forecastData.daily[i].weather[0].icon + '.png'
                        forecastElList[j].setAttribute("src", iconURL)
                        forecastElList[j].setAttribute("alt", altContent)
                    }
                }
                
                //setting the weather data assignment from the API

                //potentially set to for loop?
                forecastDateEl.textContent = moment(forecastData.daily[i].dt, "X").format("MMM Do, YYYY")
                forecastDegreeEl.textContent = convertTemp(forecastData.daily[i].temp.day) + ' \u00B0F'
                forecastWindEl.textContent = "Wind: " + forecastData.daily[i].wind_speed
                forecastHumidityEl.textContent ="Humidity: " + forecastData.daily[i].humidity
                forecastUVIndexEl.textContent = "UV Index: " + forecastData.daily[i].uvi
                forecastTempEl.append(forecastDegreeEl, forecastIconEl)
                cardsEl.append(forecastDateEl,forecastTempEl,forecastWindEl,forecastHumidityEl,forecastUVIndexEl)

            }
        })
    })
}


/////////////////// SEARCH HISTORY FUNCTIONALITY /////////////////////

//when the button to search is selected, that city is added to the search history as a button to go back to

//grab where the city history will be added to
var searchHistoryEl = document.querySelector('.search-history')

function addHistory () {
    console.log(cityInputEl.value)
    var cityName = cityInputEl.value

    //create button to add into search-history
    var historyButton = document.createElement('input');
    historyButton.setAttribute('type','button')
    historyButton.setAttribute('class', 'city')
    historyButton.setAttribute('id', cityName)
    historyButton.setAttribute('value', cityName)
    // historyButton.innerText= cityName
    searchHistoryEl.prepend(historyButton)
    console.log(historyButton)
    cityInputEl.value=''
}


// module.exports = { addHistory }
searchButtonEl.addEventListener('click', fetchData)
searchButtonEl.addEventListener('click', addHistory)
