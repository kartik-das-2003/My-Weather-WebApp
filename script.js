const apiKey = "4589984c1210d9fd063a52ec5b4edb4d"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

        if(data.weather[0].id >= 801 && data.weather[0].id < 899) {
            weatherIcon.src = "images/clouds.png";
        } else if(data.weather[0].id >= 500 && data.weather[0].id < 599) {
            weatherIcon.src = "images/rain.png";
        } else if(data.weather[0].id >= 300 && data.weather[0].id < 399) {
            weatherIcon.src = "images/drizzle.png";
        } else if(data.weather[0].id >= 700 && data.weather[0].id < 799) {
            weatherIcon.src = "images/mist.png";
        } else if(data.weather[0].id >= 200 && data.weather[0].id < 299) {
            weatherIcon.src = "images/thunderstrom.png";
        } else if(data.weather[0].id >= 600 && data.weather[0].id < 699) {
            weatherIcon.src = "images/snow.png";
        } else {
            if(data.weather[0].icon[2] === 'd') {
                weatherIcon.src = "images/sun-clear.png";
            } else {
                weatherIcon.src = "images/moon-clear.png";
            }
        }

        document.querySelector(".weather").style.display = "block";    
        document.querySelector(".error").style.display = "none";
    }
}
