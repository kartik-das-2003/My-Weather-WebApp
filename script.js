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
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";
        document.querySelector(".description").innerHTML = data.weather[0].description.toUpperCase();
        document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
        document.querySelector(".map").innerHTML = data.name;

        const mapElement = document.querySelector(".map");
        mapElement.onclick = () => {
            window.open(`https://www.google.com/search?q=${data.name}`, '_blank');
        };
        /*Case Of Day*/
        if(data.weather[0].icon[2] === 'd') {
            if(data.weather[0].id >= 801 && data.weather[0].id < 899) {
                weatherIcon.src = "images/Day-Image/clouds.png";
            } 
            else if(data.weather[0].id >= 500 && data.weather[0].id < 599) {
                weatherIcon.src = "images/Day-Image/rain.png";
            } 
            else if(data.weather[0].id >= 300 && data.weather[0].id < 399) {
                weatherIcon.src = "images/Day-Image/drizzle.png";
            } 
            else if(data.weather[0].id >= 700 && data.weather[0].id < 799) {
                weatherIcon.src = "images/Day-Image/mist.png";
            } 
            else if(data.weather[0].id >= 200 && data.weather[0].id < 299) {
                weatherIcon.src = "images/Day-Image/thunderstrom.png";
            } 
            else if(data.weather[0].id >= 600 && data.weather[0].id < 699) {
                weatherIcon.src = "images/Day-Image/snow.png";
            } 
            else {
                weatherIcon.src = "images/Day-Image/sun-clear.png";
            }
        } 
        /*Case Of Night*/
        else {
            if(data.weather[0].id >= 801 && data.weather[0].id < 899) {
                weatherIcon.src = "images/Night-Image/cloud-night";
            } 
            else if(data.weather[0].id >= 500 && data.weather[0].id < 599) {
                weatherIcon.src = "images/Night-Image/rainy-night.png";
            } 
            else if(data.weather[0].id >= 300 && data.weather[0].id < 399) {
                weatherIcon.src = "images/Night-Image/drizzle-night.png";
            } 
            else if(data.weather[0].id >= 700 && data.weather[0].id < 799) {
                weatherIcon.src = "images/Night-Image/mist-night.png";
            } 
            else if(data.weather[0].id >= 200 && data.weather[0].id < 299) {
                weatherIcon.src = "images/Night-Image/thunder-night.png";
            } 
            else if(data.weather[0].id >= 600 && data.weather[0].id < 699) {
                weatherIcon.src = "images/Night-Image/snow-night.png";
            } 
            else {
               weatherIcon.src = "images/Night-Image/clear-night.png";
            }
        }

        document.querySelector(".weather").style.display = "block";    
        document.querySelector(".error").style.display = "none";
    }
}




