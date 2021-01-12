let lon;
let lat;
let tempDescription = document.querySelector(".temp-description");
let tempDegree = document.querySelector(".temp-degree");
let city = document.querySelector(".location-timezone");
let tempIcon = document.querySelector(".icon");
let actualPosition = document.querySelector(".your-city");
let searchBox = document.querySelector(".search-box");

const api = {
  key: "af15816098f25804a80ba0ba578ec30d",
  base: "https://api.openweathermap.org/data/2.5/",
};

// Event Listeners
searchBox.addEventListener("keypress", setQuery);
actualPosition.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=af15816098f25804a80ba0ba578ec30d`;

      fetch(api)
        .then((response) => {
          let data = response.json();
          return data;
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          tempDegree.textContent = temp;
          city.textContent = `${data.name}, ${data.sys.country}`;
          tempDescription.textContent = description;
          tempIcon.innerHTML = `<img src='icons/${icon}.png'/>`;
        });
    });
  }
});

// Functions
function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(city) {
  fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then(displayData);
}

function displayData(data) {
  city.textContent = `${data.name}, ${data.sys.country}`;
  tempDegree.textContent = data.main.temp;
  tempDescription.textContent = data.weather[0].description;
  tempIcon.innerHTML = `<img src='icons/${data.weather[0].icon}.png'/>`;
}
