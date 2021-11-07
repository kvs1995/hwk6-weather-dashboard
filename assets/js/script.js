
//get access to the input field 
var cityInputEl = document.querySelector('#city')

//get access to the button
var button = document.querySelector('#search')

//create function to convert to Fahrenheit
function convertTemp(temp) {
    return Math.floor(((temp)-273.15) * (9/5) + 32)
}

//create function to fetch api button when button is click
function fetchData() {
    console.log(cityInputEl.value)
    var cityName = cityInputEl.value
    var apiKey = '410bf7cb489396d2d3451160359de4e0'
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey 
   console.log(requestURL)

   fetch(requestURL)
   .then(function(response) {
       return response.json();
   })
   .then(function(weatherData) {
       var cityNameEl = document.createElement('h2');
       var temp = document.createElement('p');
       var wind = document.createElement('p');
       var humidity = document.createElement('p');
       var uvIndex = document.createElement('p');
        weatherDataList = [cityNameEl,temp, wind, humidity, uvIndex]
        cityNameEl.textContent = weatherData.sys.name
        console.log(cityNameEl)
       temp.textContent = 'Temp: ' + convertTemp(weatherData.main.temp) + '\u00B0 F'
       wind.textContent  = 'Wind: ' +  weatherData.wind.speed +' mph'
       humidity.textContent  = 'Humidity: ' + weatherData.main.humidity
       uvIndex.textContent  = 'UV Index: '

        for (var i=0; i < weatherDataList.length; i++) {
            document.body.children[1].children[1].children[0].append(weatherDataList[i])        
        }
   })
}

button.addEventListener('click',fetchData)
