const API_KEY = "bc425ac2188d406c884f4fdd88b339f0";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=${API_KEY}`;

async function getWeatherData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
   
        document.getElementById('weatherSummary').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = Math.round(data.main.temp);
        document.getElementById('pressureValue').textContent = data.main.pressure + ' hPa';
        document.getElementById('humidityValue').textContent = data.main.humidity + ' %';
        
   
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.src = iconUrl;
        weatherIcon.style.display = 'inline-block';
        weatherIcon.alt = data.weather[0].main;

       
        const weatherCard = document.querySelector('.weather-card');
        weatherCard.style.opacity = 0;
        setTimeout(() => { weatherCard.style.opacity = 1; }, 100);
        
      
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
    
   
    if (hours >= 6 && hours < 18) {
        document.body.className = 'day-mode';
    } else {
        document.body.className = 'night-mode';
    }
}

function showError(message) {
    let errorContainer = document.getElementById('errorContainer');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.id = 'errorContainer';
        document.body.appendChild(errorContainer);
    }
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorContainer.appendChild(errorDiv);
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}


getWeatherData();
updateDublinDateTime();
setInterval(updateDublinDateTime, 1000);


setInterval(getWeatherData, 30 * 60 * 1000);

function updateDublinDateTime() {
    const now = new Date();
    const options = {
        timeZone: 'Europe/Dublin',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const dublinTime = now.toLocaleString('en-GB', options);
    document.getElementById('dublinDateTime').textContent = dublinTime;
}