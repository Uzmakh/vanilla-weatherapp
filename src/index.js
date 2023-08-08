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
    // console.log(response);
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

    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "8caba765ef85607a7196e7645c5e36e8";
let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=Dubai&appid=${apiKey}&units=metric`;
// console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);