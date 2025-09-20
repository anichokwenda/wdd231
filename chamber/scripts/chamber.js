document.getElementById('last-modified').textContent = document.lastModified;
document.getElementById('copyright-year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');

    if (menuToggle && menuList) {
        menuToggle.addEventListener('click', function () {
            menuList.classList.toggle('show');
            // Accessibility: toggle aria-expanded
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', (!expanded).toString());
        });

        // Optional: Hide menu if window is resized over 540px
        window.addEventListener('resize', function () {
            if (window.innerWidth > 540) {
                menuList.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});


// Utility for membership level
function getMembershipLevel(level) {
    switch (level) {
        case 1: return 'Bronze';
        case 2: return 'Silver';
        case 3: return 'Gold';
        case 4: return 'Platinum';
        case 5: return 'Diamond';
        default: return 'Unknown';
    }
}

// --- Member Directory (Grid/List) ---
function displayMembers(members) {
    const membersContainer = document.getElementById('members-container');
    if (!membersContainer) return;
    membersContainer.innerHTML = '';
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" style="width: 50px; height: 50px; object-fit: contain;">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        membersContainer.appendChild(memberCard);
    });
    // Grid/List toggle listeners
    document.getElementById('grid-view').addEventListener('click', () => {
        membersContainer.classList.remove('list-view');
        membersContainer.classList.add('grid-view');
    });
    document.getElementById('list-view').addEventListener('click', () => {
        membersContainer.classList.remove('grid-view');
        membersContainer.classList.add('list-view');
    });
}

// --- Spotlights (3 random Gold+) ---
function displaySpotlights(members) {
  const container = document.getElementById('spotlights-container');
  if (!container) return;
  // Gold, Platinum, Diamond (level >= 3)
  const eligible = members.filter(m => m.membershipLevel >= 3);
  // Shuffle and pick 3 random
  const shuffled = eligible.sort(() => Math.random() - 0.5);
  const spotlights = shuffled.slice(0, Math.min(3, eligible.length));
  container.innerHTML = '';
  spotlights.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${getMembershipLevel(member.membershipLevel)}</p>
      <p>${member.address}</p>
      <p><a href="${member.website}" target="_blank">${member.website}</a></p>
    `;
    container.appendChild(card);
  });
}

// --- Fetch Members ---
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        // Show directory only if on directory page
        if (document.getElementById('members-container')) {
            displayMembers(members);
        }
        // Show spotlights only if on home page
        if (document.getElementById('spotlights-container')) {
            displaySpotlights(members);
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// --- Weather Section ---
async function getWeatherData() {
    const apiEndpoint ='https://api.openweathermap.org/data/2.5/forecast';                                         
    const apiKey = 'd7fc4ed45ddb0b7faee203faed524052';
    const city = 'Chegutu';
    const units = 'imperial'; 
    try {
        const response = await fetch(`${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`);
        if (!response.ok) throw new Error('Weather API error');
        const weatherData = await response.json();
        displayWeatherData(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const currentWeatherContainer = document.getElementById('weather-data');
        if (currentWeatherContainer) currentWeatherContainer.textContent = 'Unable to load weather data.';
    }
}

function displayWeatherData(weatherData) {
    console.log('function displayWeatherData',weatherData);
    console.log('Weather Data:', weatherData);
    const currentWeatherContainer = document.getElementById('weather-data');
    const forecastContainer = document.getElementById('forecast-data');
    if (!currentWeatherContainer || !forecastContainer){
        console.error('One or both containers not found.')
        return;
    }
    if (!weatherData.list || weatherData.list.length === 0){
        console.error('No weather data available.');
        currentWeatherContainer.innerHTML = 'No weather data available.';
        forecastContainer.innerHTML = 'No forecast data available.';
        return;
    }

    const currentWeather = weatherData.list[0];
    const currentHTML = `
        <p>Current Temperature: ${Math.round(currentWeather.main.temp)}°F</p>
        <img src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="${currentWeather.weather[0].description}">
        <p>Weather: ${currentWeather.weather[0].description}</p>
        <p>High: ${Math.round(currentWeather.main.temp_max)}°F</p>
        <p>Low: ${Math.round(currentWeather.main.temp_min)}°F</p>
        <p>Humidity: ${currentWeather.main.humidity}%</p>
    `;
    currentWeatherContainer.innerHTML = currentHTML;

    // Forecast for next days (pick 3 future days at 24hr intervals)
    const forecast = weatherData.list.filter((item, i) => i % 8 === 0).slice(1, 4);
    if (forecast.length === 0) {
        forecastContainer.innerHTML = 'No forecast data available.';
        return;
    }
    const days = ['Tomorrow', 'Day After Tomorrow', 'In 3 Days'];
    const forecastHTML = forecast.map((item, i) => `
        <p>${days[i]}: ${Math.round(item.main.temp)}°F, ${item.weather[0].description}
        <img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
        </p>
    `).join('');
    forecastContainer.innerHTML = forecastHTML;

}

document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();
    getWeatherData();
});
