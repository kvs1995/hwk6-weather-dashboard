
// var cityInputEl = document.querySelector('#city')
/////////////////// SEARCH HISTORY FUNCTIONALITY /////////////////////

//when I search for a city in the input form field and click the button, the data is fetched from the URl with the filter. 

//get access to the button 
// var searchButtonEl = document.querySelector('#search')

//when the button to search is selected, that city is added to the search history as a button to go back to

//grab where the city history will be added to
var searchHistoryEl = document.querySelector('.search-history')

export function addHistory () {
    console.log(cityInputEl.value)
    var cityName = cityInputEl.value

    //create button to add into search-history
    var historyButton = document.createElement('input');
    historyButton.setAttribute('type','button')
    historyButton.setAttribute('class', 'history-button')
    historyButton.textContent = cityName
    searchHistoryEl.prepend(historyButton)
    cityInputEl.value=''
}


module.exports = { addHistory }