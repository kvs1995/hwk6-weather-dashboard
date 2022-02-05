var searchHistoryEl = document.querySelector('.search-history')
var cityInputEl = document.querySelector('.city')
var searchButtonEl = document.querySelector('#search')
var cardsEl=document.querySelector('.cards')
var searchHistoryList = JSON.parse(localStorage.getItem('search-history'))
///////// get History - initial load of the hisotry buttons in the side panels.//////////// 
// console.log(searchHistoryList)
if (searchHistoryList) {
    getHistory();
}

function getHistory() {
    console.log("line 13")
    for (var i = 0; i < searchHistoryList; i++) {
        var historyButtonEl = document.createElement('button')
        historyButtonEl.setAttribute('class','history-button')
        historyButtonEl.textContent = city
        searchHistoryEl.prepend(historyButtonEl)
        //when clicked it will run the same function that would run if a history button were clicked that is already there. 
        historyButtonEl.addEventListener("click", selectCity)
        console.log("button made at 21 going to selectCity")
    }
}


//// selectCity(event) -- calls fetch data with the whatever the history or selected city is. 

function selectCity(event) {
    event.preventDefault()
    var targetCity = this.textContent
    console.log("line 31 will it work?" + targetCity)
    // fetchData(targetCity)
    //in the for loop to grab the history from local storage, the function prepends the button so must remove
    // searchHistoryEl.removeChild(targetCity)
}

//////////////////////////// FETCH API DATA FUNCTION ////////////////


//create function to convert to Fahrenheit
function convertTemp(temp) {
    return Math.floor(((temp)-273.15) * (9/5) + 32)
}

//create function to fetch api button when button is click
function fetchData(city) {
    // console.log(city)
    // cardsEl.innerHTML = ''

    var inputCity = cityInputEl.value
    var searchCity = city || cityInputEl.value
    var apiKey = '410bf7cb489396d2d3451160359de4e0'
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&appid=' + apiKey 

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
            currentCityEl.textContent = city
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

            //////////////////////INITIATE HISTORY ADDITION//////////////////

            addHistory(searchCity)
        })
    })
}


/////////////////// SEARCH HISTORY FUNCTIONALITY /////////////////////

//when the button to search is selected, that city is added to the search history as a button to go back to

//grab where the city history will be added to


// function addHistory () {

//     //for each element in the of the local storage list, create a button with the history-button class, and set text Content of the button to the list at index i 
//     //add button to the top of the search history aside
//     //add eventListener for selectCity(event) that will remove the button from the button or wherever it is in the list in local storage

//     console.log(cityInputEl.value)
//     var cityName = cityInputEl.value

//     //create button to add into search-history
//     var historyButton = document.createElement('input');
//     historyButton.setAttribute('type','button')
//     historyButton.setAttribute('class', 'city')
//     historyButton.setAttribute('id', cityName)
//     historyButton.setAttribute('value', cityName)
//     // historyButton.innerText= cityName
//     searchHistoryEl.prepend(historyButton)
//     console.log(historyButton)
//     cityInputEl.value=''
// }


///////// Add New City Function - called at the end of fetch data and selectCity /////
function addHistory(city) {
    var historyButtonEl = document.createElement('button')
    historyButtonEl.setAttribute('class','history-button')
    historyButtonEl.textContent = city
    searchHistoryEl.prepend(historyButtonEl)
    //when clicked it will run the same function that would run if a history button were clicked that is already there. 
    historyButtonEl.addEventListener("click", selectCity)

    //add to the local storage by stringifyingt he searchhistorylist after adding the new city
    searchHistoryList.push(city)
    localStorage.setItem('search-history', JSON.stringify(searchHistoryList))

}


searchButtonEl.addEventListener('click', fetchData)
searchButtonEl.addEventListener('click', addHistory)
