const baseUrl = "http://localhost:3001";

// Fetch and display all seasons
fetchSeasons();

function fetchSeasons() {
  const seasons = ["Summer", "Winter", "Monsoon"];
  const seasonContainer = document.getElementById("seasons");

  const bar = document.createElement("div");
  bar.className = "season-bar";
  bar.innerHTML = "<h2>Explore the Seasons</h2>";
  seasonContainer.appendChild(bar);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "season-button-container";

  seasons.forEach((season) => {
    const div = document.createElement("div");
    div.className = "season-item";

    const image = document.createElement("img");
    image.src = `/assets/${season.toLowerCase()}1.jpg`; // Updated path
    image.className = "season-image";

    const name = document.createElement("div");
    name.className = "season-name";
    name.innerText = season.charAt(0).toUpperCase() + season.slice(1);

    div.appendChild(image);
    div.appendChild(name);

    div.onclick = () =>
      (window.location.href = `destinations.html?season=${season}`);

    buttonContainer.appendChild(div);
  });

  seasonContainer.appendChild(buttonContainer);
}

function fetchDestinations(season) {
  fetch(`${baseUrl}/destination/${season}`)
    .then((response) => response.json())
    .then((destinations) => {
      const destinationContainer = document.getElementById("destinations");

      const titleBar = document.createElement("div");
      titleBar.className = "destination-bar";
      titleBar.innerHTML = "<h2>Discover Your Destination</h2>";

      destinationContainer.innerHTML = "";
      destinationContainer.appendChild(titleBar);

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";

      destinations.forEach((destination) => {
        const div = document.createElement("div");
        div.className = "list-item";

        // Image element
        const img = document.createElement("img");
        img.src = `/assets/${destination.toLowerCase()}.jpg`; // Updated path
        img.alt = destination;
        img.className = "destination-image";

        // Text element for the destination name
        const text = document.createElement("p");
        text.innerText = destination;
        text.className = "destination-name";

        // Adding image and text to the div
        div.appendChild(img);
        div.appendChild(text);

        // Set onclick event for the div
        div.onclick = () =>
          (window.location.href = `places.html?destination=${destination}`);

        // Append the div to the button container
        buttonContainer.appendChild(div);
      });

      destinationContainer.appendChild(buttonContainer);
    });
}

function fetchPlaces(destination) {
  fetch(`${baseUrl}/destinations/${destination}`)
    .then((response) => response.json())
    .then((places) => {
      const placesContainer = document.getElementById("places-container");
      placesContainer.innerHTML = ""; // Clear any existing content

      places.forEach((place) => {
        const div = document.createElement("div");
        div.className = "place-item";

        // Create an image element
        const img = document.createElement("img");
        const imageUrl = `/assets/${place.name.toLowerCase()}.jpg`; // Updated path
        console.log(imageUrl);
        img.src = imageUrl;
        img.alt = place.name;

        // Create a title element
        const title = document.createElement("h2");
        title.innerText = place.name;

        // Create a description element
        const description = document.createElement("p");
        description.innerText = place.description;

        // Create an opening hours element
        const hours = document.createElement("p");
        hours.innerText = `Opening Hours: ${place.opening_hours}`;

        // Append all elements to the container
        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(description);
        div.appendChild(hours);

        placesContainer.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error fetching places:", error);
    });
}

document.getElementById("weather-btn").onclick = () => {
  window.location.href = "weather.html";
};
