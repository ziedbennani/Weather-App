let lon;
let lat;
let tempDescription = document.querySelector(".temp-description");
let tempDegree = document.querySelector(".temp-degree");
let city = document.querySelector(".location-timezone");
let tempIcon = document.querySelector(".icon");
let actualPosition = document.querySelector(".position");
let searchBox = document.querySelector(".search-box");

const api = {
    key: config.API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
};

// Event Listeners
searchBox.addEventListener("keypress", setQuery);
actualPosition.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            loadData();
        });
    }
});

// Functions
const loadData = async () => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=af15816098f25804a80ba0ba578ec30d`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const { temp } = data.main;
        const { description, icon } = data.weather[0];
        tempDegree.textContent = temp;
        city.textContent = `${data.name}, ${data.sys.country}`;
        tempDescription.textContent = description;
        tempIcon.innerHTML = `<img src='icons/${icon}.png'/>`;
    } catch (err) {
        console.error(err);
    }
};

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchBox.value);
    }
}

const getResults = async city => {
    try {
        const res = await fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`);
        const data = await res.json();
        displayData(data);
        console.log(data);
    } catch (err) {
        console.error(err);
    }
};

const displayData = data => {
    city.textContent = `${data.name}, ${data.sys.country}`;
    tempDegree.textContent = data.main.temp;
    tempDescription.textContent = data.weather[0].description;
    tempIcon.innerHTML = `<img src='icons/${data.weather[0].icon}.png'/>`;
};
