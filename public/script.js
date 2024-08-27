const baseUrl = "http://localhost:3001";


// Fetch and display all seasons
fetchSeasons();

function fetchSeasons() {
  const seasons = ["summer", "winter", "spring"]; // You can add more seasons as needed
  const seasonContainer = document.getElementById("seasons");
  seasonContainer.innerHTML = "<h2>Select a Season</h2>";
  seasons.forEach((season) => {
    const button = document.createElement("button");
    button.innerText = season.charAt(0).toUpperCase() + season.slice(1);
    button.className = "button";
    button.onclick = () => fetchDestinations(season);
    seasonContainer.appendChild(button);
  });
}

// Fetch and display destinations for a particular season
function fetchDestinations(season) {
  fetch(`${baseUrl}/destination/${season}`)
    .then((response) => response.json())
    .then((destinations) => {
      const destinationContainer = document.getElementById("destinations");
      destinationContainer.innerHTML = "<h2>Select a Destination</h2>";
      destinations.forEach((destination) => {
        const div = document.createElement("div");
        div.className = "list-item";
        div.innerText = destination;
        div.onclick = () => fetchPlaces(destination);
        destinationContainer.appendChild(div);
      });
    });
}

// Fetch and display places to visit for a particular destination
function fetchPlaces(destination) {
  fetch(`${baseUrl}/destinations/${destination}`)
    .then((response) => response.json())
    .then((places) => {
      const placesContainer = document.getElementById("places");
      placesContainer.innerHTML = "<h2>Places to Visit</h2>";
      places.forEach((place) => {
        const div = document.createElement("div");
        div.className = "list-item";
        div.innerHTML = `<strong>${place.name}</strong><br>${place.description}<br>Opening Hours: ${place.opening_hours}`;
        placesContainer.appendChild(div);
      });
    });
}

// Navigate to weather forecast page
document.getElementById("weather-btn").onclick = () => {
  window.location.href = "weather.html";
};



