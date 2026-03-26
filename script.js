const apiKey = "YOUR_API_KEY";

let map;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 7.0731, lng: 125.6128 }, // default Davao
    zoom: 8
  });
}

function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (city === "") {
    alert("Please enter a city!");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
      updateMap(data.coord.lat, data.coord.lon);
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = error.message;
    });
}

function displayWeather(data) {
  const html = `
    <h2>${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
  document.getElementById("weatherResult").innerHTML = html;
}

function updateMap(lat, lng) {
  const location = { lat: lat, lng: lng };

  map.setCenter(location);

  if (marker) {
    marker.setMap(null);
  }

  marker = new google.maps.Marker({
    position: location,
    map: map
  });
}
