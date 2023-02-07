let weatherApiKey = '855662385d289b3266003eed492d718d';
let city ="";
let getSearchBtn = document.getElementById('search-button');
let searchInput = document.getElementById('search-input');
let tempEl = document.getElementById('temperature');
let humidityEl = document.getElementById('humidity');
let windEl = document.getElementById('windSpeed');
let searchButton = document.querySelector('#search-button');
let todaySection = document.querySelector('#today');
let forecastSection = document.querySelector('#forecast');



function searchCity(event) {
    event.preventDefault();
    let latLoc = ""
    let lonLoc = ""

    city = searchInput.value;
    let geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + weatherApiKey;

    fetch(geoApiUrl)
      .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      latLoc = data[0].lat
      lonLoc = data[0].lon
      
    let weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latLoc + '&lon=' + lonLoc + '&appid=' + weatherApiKey + '&units=imperial';
    fetch(weatherApiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let temperature = data.list[0].main.temp;
        let humidity = data.list[0].main.humidity;
        let windSpe = data.list[0].wind.speed;
    
        tempEl.innerHTML = temperature + "°F";
        humidityEl.innerHTML = humidity + "%";
        windEl.innerHTML = windSpe + " mph";

        for (let i = 1; i < 6; i++) {
          let forecastTemp = data.list[i].main.temp;
          let forecastHumidity = data.list[i].main.humidity;
          let forecastDate = data.list[i].dt_txt;
          
          
          let forecastHTML = `
              <div class="forecast-item">
                  <p class="forecast-date">Date: ${forecastDate}</p>
                  <p class="forecast-temp">Temperature: ${forecastTemp}°F</p>
                  <p class="forecast-humidity">Humidity: ${forecastHumidity}%</p>
              </div>
          `;
          forecastSection.innerHTML += forecastHTML;

      }})
    });
}


getSearchBtn.addEventListener('click', searchCity);

searchButton.addEventListener("click", function() {
  todaySection.style.display = "block";
});

