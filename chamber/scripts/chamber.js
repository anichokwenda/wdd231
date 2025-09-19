document.getElementById('last-modified').textContent = document.lastModified;
document.getElementById('copyright-year').textContent = new Date().getFullYear();

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
// Only run if #members-container exists
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
  const spotlights = shuffled.slice(0, Math.min(3, eligible.length)); // Ensure we don't try to show more than available
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

// --- Weather ---
async function getWeatherData() {
    const apiEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';
    const apiKey = 'd7fc4ed45ddb0b7faee203faed524052';
    const city = 'Chegutu';
    const units = 'metric';

    try {
        const response = await fetch(`${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`);
        if (!response.ok) throw new Error('Weather API error');
        const weatherData = await response.json();
        displayWeatherData(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherDiv = document.getElementById('weather-data');
        if (weatherDiv) weatherDiv.textContent = 'Unable to load weather data.';
    }
}

function displayWeatherData(weatherData) {
    const weatherContainer = document.getElementById('weather-data');
    if (!weatherContainer) return;
    if (!weatherData.list || weatherData.list.length === 0) {
        weatherContainer.textContent = 'No weather data available.';
        return;
    }
    // Current
    const currentWeather = weatherData.list[0];
    const currentHTML = `
        <p>Current Temperature: ${currentWeather.main.temp}°C</p>
        <p>Current Weather: ${currentWeather.weather[0].description}</p>
        <img src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="${currentWeather.weather[0].description}">
    `;
    // Forecast (next 3 days)
    const forecast = weatherData.list.filter((item, i) => i % 8 === 0).slice(1, 4);
    const forecastHTML = forecast.map((item, i) => `
        <p>Day ${i + 1}: ${item.main.temp}°C, ${item.weather[0].description}
        <img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
        </p>
    `).join('');
    weatherContainer.innerHTML = `
        ${currentHTML}
        <h3>3-Day Forecast:</h3>
        ${forecastHTML}
    `;
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();
    getWeatherData();
});
