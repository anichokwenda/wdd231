async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// Display members in grid or list view
function displayMembers(members) {
    const membersContainer = document.getElementById('members-container');
    membersContainer.innerHTML = '';
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" style="width: 50px; height: 50px; object-fit: contain;">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}">${member.website}</a></p>
        `;
        membersContainer.appendChild(memberCard);
    });
}

// Toggle between grid and list views
    document.getElementById('grid-view').addEventListener('click', () => {
        document.getElementById('members-container').classList.remove('list-view');
        document.getElementById('members-container').classList.add('grid-view');
    });

    document.getElementById('list-view').addEventListener('click', () => {
        document.getElementById('members-container').classList.remove('grid-view');
        document.getElementById('members-container').classList.add('list-view');
    });

// Display last modified date and copyright year
document.getElementById('last-modified').textContent = document.lastModified;
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Call fetchMembers function when the page loads
document.addEventListener('DOMContentLoaded', fetchMembers);

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// Display spotlights
function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights-container');
    const goldSilverMembers = members.filter(member => member.membershipLevel >= 3);
    const randomMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    randomMembers.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');
        spotlightCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" style="width: 50px; height: 50px; object-fit: contain;">
            <h3>${member.name}</h3>
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p><a href="${member.website}">Website</a></p>
            <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
        `;
        spotlightsContainer.appendChild(spotlightCard);
    });
}

// Get membership level
function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return 'Bronze';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        case 4:
            return 'Platinum';
        case 5:
            return 'Diamond';
        default:
            return 'Unknown';
    }
}

// Get weather data
async function getWeatherData() {
    const apiEndpoint = '#';                         
    const apiKey = '//api.openweathermap.org/data/2.5/forecast';
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';                             
    const city = '// Replace with your API key';
    const city = 'Chegutu';                              
    const units = '// Replace with the city name';
    const units = 'metric';                                    

    try {
        const response = await fetch(`${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`);
        const weatherData = await response.json();
        displayWeatherData(weatherData);
    } catch (error) {
        console.error('// Use metric units for temperature');
    }
    try {
        const response = await fetch(`${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`);
        const weatherData = await response.json();
        displayWeatherData(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

                       
function displayWeatherData(weatherData) {
    const weatherContainer = document.getElementById('// Display weather data')
function displayWeatherData(weatherData) {
    const weatherContainer = document.getElementById('weather-data');
    const currentWeather = weatherData.list[0];
    const forecast = weatherData.list.filter((item, index) => index % 8 === 0).slice(1, 4);

    const currentWeatherHTML = `
        <p>Current Temperature: ${currentWeather.main.temp}°C</p>
        <p>Current Weather: ${currentWeather.weather[0].description}</p>
    `;

    const forecastHTML = forecast.map((item, index) => `
        <p>Day ${index + 1}: ${item.main.temp}°C</p>
    `).join('');

    weatherContainer.innerHTML = `
        ${currentWeatherHTML}
        <h3>3-Day Forecast:</h3>
        ${forecastHTML}
    `;
}

                                     
document.addEventListener('// Call functions when the page loads')
document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();
    getWeatherData();
    document.getElementById('last-modified').textContent = document.lastModified;
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
});
