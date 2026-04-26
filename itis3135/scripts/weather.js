const button = document.getElementById("get-weather-btn");
const select = document.getElementById("city-select");

// API FUNCTION
async function getWeather(city) {
  try {
    const res = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// DISPLAY FUNCTION
async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later");
    return;
  }

  // Fill UI (use N/A fallback)
  document.getElementById("location").textContent = data.name || "N/A";
  document.getElementById("weather-main").textContent = data.weather?.[0]?.main || "N/A";
  document.getElementById("weather-icon").src = data.weather?.[0]?.icon || "";

  document.getElementById("main-temperature").textContent =
    data.main?.temp !== undefined ? `Temp: ${data.main.temp}°C` : "Temp: N/A";

  document.getElementById("feels-like").textContent =
    data.main?.feels_like !== undefined ? `Feels like: ${data.main.feels_like}°C` : "Feels like: N/A";

  document.getElementById("humidity").textContent =
    data.main?.humidity !== undefined ? `Humidity: ${data.main.humidity}%` : "Humidity: N/A";

  document.getElementById("wind").textContent =
    data.wind?.speed !== undefined ? `Wind: ${data.wind.speed} m/s` : "Wind: N/A";

  document.getElementById("wind-gust").textContent =
    data.wind?.gust !== undefined ? `Wind Gust: ${data.wind.gust} m/s` : "Wind Gust: N/A";
}

// BUTTON EVENT
button.addEventListener("click", () => {
  const city = select.value;

  if (!city) return; // do nothing if empty

  showWeather(city);
});