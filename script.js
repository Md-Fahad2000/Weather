const API_KEY = "bc425ac2188d406c884f4fdd88b339f0";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=${API_KEY}`;

async function getWeatherData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
   
        document.getElementById('weatherSummary').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = Math.round(data.main.temp);
        document.getElementById('pressure').textContent = data.main.pressure;
        document.getElementById('humidity').textContent = data.main.humidity;
        
      
        const lastUpdated = new Date().toLocaleString();
        document.getElementById('lastUpdated').textContent = lastUpdated;
        
       
        updateBackground();
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Failed to fetch weather data. Please try again later.');
    }
}

function updateBackground() {
    const now = new Date();
    const hours = now.getHours();
    
    // Update background based on time of day
    if (hours >= 6 && hours < 18) {
        document.body.className = 'day-mode';
    } else {
        document.body.className = 'night-mode';
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Initial load
getWeatherData();

// Update weather data every 30 minutes
setInterval(getWeatherData, 30 * 60 * 1000);