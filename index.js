const changeBgList = document.querySelector(".change-bg");
async function getCityJson() {
  const response = await fetch("./data.json");
  const data = await response.json();
  return data.city;
}

async function getWeather() {
  const city = await getCityJson();
  const url = `https://api.weatherapi.com/v1/current.json?key=acabd4755e0b4a88a3c100431231408&q=${city}&aqi=no`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

(async function () {
  let html;

  try {
    const data = await getWeather();
    html = `
    <article class="weather-card">
        <h1 class="weather-card-top">Weather App</h1>
        <div class="weather-card-mid">
            <div class="weather-card-mid-icon"><img src="https:${data.current.condition.icon}"/> </div>
            <p class="weather-card-mid-temperature">${data.current.temp_c}°C</p>
            <p class="weather-card-mid-condition">
                ${data.current.condition.text}
            </p>
            <p class="weather-card-mid-city"><i class="fa-solid fa-location-dot"></i> ${data.location.name}</p>
        </div>
        <div class="weather-card-bottom">
            <div class="weather-card-bottom-left">
                <div class="weather-card-bottom-left-icon"><i class="fa-solid fa-temperature-three-quarters"></i></div>
                <div class="weather-card-bottom-left-feels-like">
                    <p class="weather-card-bottom-left-feels-like-num">${data.current.feelslike_c}°C</p>
                    <p class="weather-card-bottom-left-feels-like">Feels like</p>
                </div>
            </div>
            <div class="weather-card-bottom-right">
                <div class="weather-card-bottom-icon"><i class="fa-solid fa-droplet"></i></div>
                <div class="weather-card-bottom-right-humidity">
                    <p class="weather-card-bottom-right-humidity-num">${data.current.humidity}%</p>
                    <p class="weather-card-bottom-right-humidity">Humidity</p>
                </div>
            </div>
        </div>
    </article>`;
  } catch (error) {
    html = `
      <p class="error">Oups... Une erreur s'est produite.</p>
    `;
  }

  document.querySelector("main").innerHTML = html;
})();

const oneHour = 1000 * 60 * 60;

setInterval(() => {
  location.reload();
}, oneHour);

// Change background feature
const colors = [
  "023047",
  "2EA1E3",
  "ef476f",
  "ffd166",
  "06d6a0",
  "118ab2",
  "dd2d4a",
];

colors.forEach((color) => {
  const li = document.createElement("li");
  li.style.backgroundColor = `#${color}`;
  li.addEventListener("click", () => {
    document.body.style.backgroundColor = `#${color}`;
  });

  changeBgList.appendChild(li);
});
