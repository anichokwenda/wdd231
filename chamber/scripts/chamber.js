document.getElementById('last-modified').textContent = document.lastModified;
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', function () {
    const timestamp = new Date().toLocaleString();
    document.getElementById('timestamp').value = timestamp;
    
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
    
    // Modal functionality
const modals = document.querySelectorAll('.modal');
const modalLinks = document.querySelectorAll('.modal-link');
const closeButtons = document.querySelectorAll('.close');

// Open modal
modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
});

// Close modal
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});
    // Trigger animations after page load
    setTimeout(() => {
        const cards = document.querySelectorAll('.animate-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 100}ms`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 100);
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
        const data = await response.json();
        const members = data.members || [];

        // Show directory only if on directory page
        if (document.getElementById('members-container')) {
            displayMembers(members);
        }
        // Show spotlights only if on home page
        if (document.getElementById('spotlights-container')) {
            displaySpotlights(members);
        }
        
        // Show discover items only if on discover page
        if (document.querySelector('.grid-container') && data.discoverItems) {
            displayDiscoverItems(data.discoverItems);
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// --- Display Discover Items ---
function displayDiscoverItems(discoverItems) {
    const container = document.querySelector('.grid-container');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing content
    
    discoverItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.gridArea = `card${index + 1}`;
        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure><img src="${item.image}" alt="${item.name}"></figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
        `;
        container.appendChild(card);
    });
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

const form = document.getElementById('join-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams();
    params.append('firstName', formData.get('firstName'));
    params.append('lastName', formData.get('lastName'));
    params.append('organizationalTitle', formData.get('organizationalTitle'));
    params.append('email', formData.get('email'));
    params.append('mobileNumber', formData.get('mobileNumber'));
    params.append('businessName', formData.get('businessName'));
    params.append('membershipLevel', formData.get('membershipLevel'));
    params.append('description', formData.get('description'));
    params.append('timestamp', new Date().toLocaleString());

    window.location.href = `thankyou.html?${params.toString()}`;
});

// Check if there's a last visit date in localStorage
let lastVisit = localStorage.getItem('lastVisit');

if (!lastVisit) {
  // First visit
  document.getElementById('message').innerText = "Welcome! Let us know if you have any questions.";
} else {
  // Calculate time difference in days
  let lastVisitDate = parseInt(lastVisit);
  let currentDate = Date.now();
  let timeDiff = currentDate - lastVisitDate;
  let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff < 1) {
    document.getElementById('message').innerText = "Back so soon! Awesome!";
  } else {
    let daysText = daysDiff === 1 ? 'day' : 'days';
    document.getElementById('message').innerText = `You last visited ${daysDiff} ${daysText} ago.`;
  }
}

// Store current date in localStorage
localStorage.setItem('lastVisit', Date.now());
