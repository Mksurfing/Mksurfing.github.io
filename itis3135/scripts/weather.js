const button = document.getElementById("get-weather-btn");
const select = document.getElementById("city-select");

// GET WEATHER DATA
async function getWeather(city) {
  try {
    const res = await fetch(
      "https://weather-proxy.freecodecamp.rocks/api/city/" + city
    );

    if (!res.ok) {
      console.error("API error:", res.status);
      return undefined;
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// DISPLAY WEATHER
async function showWeather(city) {
  if (!city) return;

  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later");
    return;
  }

  // Location
  document.getElementById("location").textContent =
    data.name ? data.name : "N/A";

  // Weather type
  if (data.weather && data.weather.length > 0) {
    document.getElementById("weather-main").textContent =
      data.weather[0].main ? data.weather[0].main : "N/A";

    document.getElementById("weather-icon").src =
      data.weather[0].icon ? data.weather[0].icon : "";
  } else {
    document.getElementById("weather-main").textContent = "N/A";
    document.getElementById("weather-icon").src = "";
  }

  // Temperature
  if (data.main) {
    document.getElementById("main-temperature").textContent =
      data.main.temp !== undefined
        ? "Temp: " + data.main.temp + "°C"
        : "Temp: N/A";

    document.getElementById("feels-like").textContent =
      data.main.feels_like !== undefined
        ? "Feels like: " + data.main.feels_like + "°C"
        : "Feels like: N/A";

    document.getElementById("humidity").textContent =
      data.main.humidity !== undefined
        ? "Humidity: " + data.main.humidity + "%"
        : "Humidity: N/A";
  } else {
    document.getElementById("main-temperature").textContent = "Temp: N/A";
    document.getElementById("feels-like").textContent = "Feels like: N/A";
    document.getElementById("humidity").textContent = "Humidity: N/A";
  }

  // Wind
  if (data.wind) {
    document.getElementById("wind").textContent =
      data.wind.speed !== undefined
        ? "Wind: " + data.wind.speed + " m/s"
        : "Wind: N/A";

    document.getElementById("wind-gust").textContent =
      data.wind.gust !== undefined
        ? "Wind Gust: " + data.wind.gust + " m/s"
        : "Wind Gust: N/A";
  } else {
    document.getElementById("wind").textContent = "Wind: N/A";
    document.getElementById("wind-gust").textContent = "Wind Gust: N/A";
  }
}

// BUTTON CLICK
button.addEventListener("click", function () {
  const city = select.value;

  if (!city) return;

  showWeather(city);
});