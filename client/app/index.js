function getLocation() {
    // docs: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    // attempt to get user's location from browser
    if (navigator.geolocation) {
        // prompt user to allow location access
        navigator.geolocation.getCurrentPosition((position) => {
            // extract the coordinates
            const { latitude, longitude } = position.coords;

            // using the coordinates, send a request to our server
            getWeather(latitude, longitude).catch((err) => {
                alert("Unable to get weather data");
                console.error(`Error getting weather data`, err);
            })
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function getWeather(lat, lon) {
    const res = await fetch('/api/current-weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lon }),
    });

    // destructure the response body
    const { city, icon, description, currentTemp, minTemp, maxTemp } = await res.json();

    // if the response is not ok, alert the user
    if (!res.ok) {
        console.error('Error getting weather data', err);
        alert("Unable to get weather data");
        return;
    }

    // otherwise, hide loader and display weather data
    const loaderElement = document.getElementById('loader');
    loaderElement.classList.add('hidden');

    const containerElement = document.getElementById('container');
    containerElement.classList.remove('hidden');

    const cityElement = document.getElementById('city');
    cityElement.innerHTML = city;

    const iconElement = document.getElementById('icon');
    iconElement.src = icon;

    const descriptionElement = document.getElementById('description');
    descriptionElement.innerHTML = description;

    const currentTempElement = document.getElementById('currentTemp');
    currentTempElement.innerHTML = `${currentTemp}°F`;

    const minTempElement = document.getElementById('minTemp');
    minTempElement.innerHTML = `${minTemp}°F`;

    const maxTempElement = document.getElementById('maxTemp');
    maxTempElement.innerHTML = `${maxTemp}°F`;

}

window.onload = getLocation;
