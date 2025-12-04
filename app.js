apiId = "4d020f33519a4bf8b2c123123252710";
baseUrl = "https://api.weatherapi.com/v1/current.json?key=4d020f33519a4bf8b2c123123252710";

const weather = document.querySelector("#weather");
const input = document.querySelector("#search-bar input");
const searchBtn = document.querySelector(".js-search-button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMsg = document.querySelector("#error");

const temp = document.querySelector(".js-temp");
const city = document.querySelector(".js-city");
const humidity = document.querySelector(".js-humidity");
const wind = document.querySelector(".js-wind");




async function checkWeather (cityInput) {
    try {
        const response = await fetch(baseUrl + `&q=${cityInput}`);
        const data = await response.json();
    
        // console.log(data);
    
        renderData(data);
    } catch (error) {
        errorMsg.style.display = "block";
        weather.style.display = "none";
    }

}


function renderWeatherIcon(code) {
    if (code === 1000) {
        weatherIcon.src = 'images/clear.png';
    } else if (code>=1003 && code<=1009) {
        weatherIcon.src = 'images/clouds.png';
    } else if ((code>=1030 && code<=1087) || (code>=1135 && code<=1147)) {
        weatherIcon.src = 'images/mist.png';
    } else if ((code>=1114 && code<=1117) || (code>=1210 && code<=1237) || (code>=1255 && code<=1282)) {
        weatherIcon.src = 'images/snow.png';
    } else if (code>=1150 && code<=1180) {
        weatherIcon.src = 'images/drizzle.png';
    } else if ((code>=1183 && code<=1207) || (code>=1240 && code<=1252)) {
        weatherIcon.src = 'images/rain.png';
    }
}


function renderData(data) {
    temp.innerText = `${Math.round(data.current.temp_c)}°c`;
    city.innerText = data.location.name;
    humidity.innerText = `${data.current.humidity}%`;
    wind.innerText = `${data.current.wind_kph} kph`;

    renderWeatherIcon(data.current.condition.code);

    weather.style.display = "block";
    errorMsg.style.display = "none";

}


searchBtn.addEventListener('click', () => {
    checkWeather(input.value);
});
input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        checkWeather(input.value);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    input.focus();
});
