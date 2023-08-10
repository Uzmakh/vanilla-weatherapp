function formatDate(timestamp) {
    // calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    // we do console log to check whether our code is working
    console.log(response);
    // console.log(response.data.name);
    // console.log(response.data.main.temp);
    // console.log(response.data.weather[0].main);
    // console.log(response.data.weather[0].description);
    // console.log(response.data.main.humidity);
    // console.log(response.data.wind.speed);
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png `);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
    let apiKey = "8caba765ef85607a7196e7645c5e36e8";
    // let city = "Murree";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    // console.log(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    // remove the active class from celsius link
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let fahrenheitTemperature = (celsiusTemperature * 9.0 / 5.0 + 32.0);
    // alert(fahrenheitTemperature);
    // alert("link clicked");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();

    let temperatureElement = document.querySelector("#temperature");

    // remove the active class from fahrenheit link
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Multan");
