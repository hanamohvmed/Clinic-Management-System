import React, { useState, useEffect } from 'react';
import { Search, Cloud, Sun, CloudRain, Wind, Thermometer, Eye, Droplets, CloudSnow, Zap } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  maxWidth: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '18px'
  },
  searchSection: {
    background: 'white',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '25px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
  },
  searchContainer: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  searchInput: {
    flex: '1',
    padding: '15px 20px',
    border: '2px solid #e9ecef',
    borderRadius: '10px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  searchInputFocus: {
    borderColor: '#74b9ff'
  },
  searchButton: {
    background: '#74b9ff',
    color: 'white',
    border: 'none',
    padding: '15px 25px',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s'
  },
  searchButtonHover: {
    background: '#0984e3'
  },
  weatherGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginBottom: '25px'
  },
  weatherCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
  },
  currentWeatherCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#2d3436'
  },
  cardTitleWhite: {
    color: 'white'
  },
  tempDisplay: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  weatherDescription: {
    fontSize: '18px',
    marginBottom: '20px',
    opacity: '0.9',
    textTransform: 'capitalize'
  },
  weatherDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '8px'
  },
  detailItemLight: {
    background: '#f8f9fa'
  },
  forecastGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  forecastCard: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  },
  forecastDay: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#2d3436'
  },
  forecastTemp: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0984e3',
    marginBottom: '8px'
  },
  forecastDescription: {
    fontSize: '14px',
    color: '#636e72',
    textTransform: 'capitalize'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #74b9ff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  errorMessage: {
    background: '#ff7675',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  placeholder: {
    textAlign: 'center',
    color: '#636e72',
    fontSize: '18px',
    padding: '40px 20px'
  }
};

// CSS animation for spinner
const spinnerCSS = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const WeatherApp = () => {
  const [searchCity, setSearchCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  const API_KEY = '43c908c773942521a90dc4e4b498ec5c';

  const getWeatherIcon = (weatherCode, description) => {
    const desc = description.toLowerCase();
    
    if (desc.includes('clear') || desc.includes('sunny')) return <Sun size={24} />;
    if (desc.includes('rain') || desc.includes('drizzle')) return <CloudRain size={24} />;
    if (desc.includes('snow')) return <CloudSnow size={24} />;
    if (desc.includes('thunder')) return <Zap size={24} />;
    if (desc.includes('cloud')) return <Cloud size={24} />;
    
    return <Sun size={24} />;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  const handleSearch = async () => {
    if (!searchCity.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Fetch current weather
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchCity.trim())}&appid=${API_KEY}&units=metric`;
      console.log('Fetching weather from:', currentUrl);
      
      const currentResponse = await fetch(currentUrl);
      
      if (!currentResponse.ok) {
        const errorData = await currentResponse.json().catch(() => ({}));
        console.log('API Error:', errorData);
        
        if (currentResponse.status === 401) {
          throw new Error('Invalid API key. Please check your API key.');
        } else if (currentResponse.status === 404) {
          throw new Error(`City "${searchCity}" not found. Try checking the spelling or use format like "London, UK"`);
        } else {
          throw new Error(`API Error: ${errorData.message || 'Unknown error'}`);
        }
      }
      
      const currentData = await currentResponse.json();
      
      // Fetch 5-day forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(searchCity.trim())}&appid=${API_KEY}&units=metric`;
      const forecastResponse = await fetch(forecastUrl);
      
      if (!forecastResponse.ok) {
        console.log('Forecast API error, but continuing with current weather only');
      }
      
      const forecastData = forecastResponse.ok ? await forecastResponse.json() : null;
      
      // Process current weather data
      const processedCurrentWeather = {
        city: currentData.name,
        country: currentData.sys.country,
        temperature: Math.round(currentData.main.temp),
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(currentData.visibility / 1000), // Convert m to km
        pressure: currentData.main.pressure,
        feelsLike: Math.round(currentData.main.feels_like),
        weatherCode: currentData.weather[0].id
      };
      
      // Process forecast data (get one forecast per day)
      const dailyForecasts = [];
      
      if (forecastData && forecastData.list) {
        const processedDates = new Set();
        
        forecastData.list.forEach(item => {
          const date = new Date(item.dt * 1000).toDateString();
          if (!processedDates.has(date) && dailyForecasts.length < 5) {
            dailyForecasts.push({
              day: formatDate(item.dt),
              temp: Math.round(item.main.temp),
              description: item.weather[0].description,
              weatherCode: item.weather[0].id,
              humidity: item.main.humidity,
              windSpeed: Math.round(item.wind.speed * 3.6)
            });
            processedDates.add(date);
          }
        });
      }
      
      setCurrentWeather(processedCurrentWeather);
      setForecast(dailyForecasts);
      setLoading(false);
      
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message || 'Unable to fetch weather data. Please try again.');
      setLoading(false);
      setCurrentWeather(null);
      setForecast([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <style>{spinnerCSS}</style>
      <div style={styles.container}>
        <div style={styles.maxWidth}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.title}>Weather Dashboard</h1>
            <p style={styles.subtitle}>Get current weather and 5-day forecast for any city</p>
          </div>

          {/* Search Section */}
          <div style={styles.searchSection}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Enter city name..."
                style={{
                  ...styles.searchInput,
                  ...(searchFocused ? styles.searchInputFocus : {})
                }}
              />
              <button
                onClick={handleSearch}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
                disabled={loading}
                style={{
                  ...styles.searchButton,
                  ...(buttonHovered ? styles.searchButtonHover : {}),
                  opacity: loading ? 0.7 : 1
                }}
              >
                <Search size={20} />
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
            </div>
          )}

          {/* Weather Content */}
          {!loading && currentWeather && (
            <div style={styles.weatherGrid}>
              {/* Current Weather Card */}
              <div style={{...styles.weatherCard, ...styles.currentWeatherCard}}>
                <h2 style={styles.cardTitleWhite}>
                  Current Weather in {currentWeather.city}, {currentWeather.country}
                </h2>
                <div style={styles.tempDisplay}>{currentWeather.temperature}°C</div>
                <div style={styles.weatherDescription}>
                  {currentWeather.description} • Feels like {currentWeather.feelsLike}°C
                </div>
                
                <div style={styles.weatherDetails}>
                  <div style={styles.detailItem}>
                    <Droplets size={20} />
                    <span>Humidity: {currentWeather.humidity}%</span>
                  </div>
                  <div style={styles.detailItem}>
                    <Wind size={20} />
                    <span>Wind: {currentWeather.windSpeed} km/h</span>
                  </div>
                  <div style={styles.detailItem}>
                    <Eye size={20} />
                    <span>Visibility: {currentWeather.visibility} km</span>
                  </div>
                  <div style={styles.detailItem}>
                    <Thermometer size={20} />
                    <span>Pressure: {currentWeather.pressure} hPa</span>
                  </div>
                </div>
              </div>

              {/* 5-Day Forecast Card */}
              <div style={styles.weatherCard}>
                <h2 style={styles.cardTitle}>5-Day Forecast</h2>
                <div style={styles.forecastGrid}>
                  {forecast.map((day, index) => (
                    <div key={index} style={styles.forecastCard}>
                      <div style={styles.forecastDay}>{day.day}</div>
                      <div style={{marginBottom: '10px'}}>
                        {getWeatherIcon(day.weatherCode, day.description)}
                      </div>
                      <div style={styles.forecastTemp}>{day.temp}°C</div>
                      <div style={styles.forecastDescription}>{day.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder when no data */}
          {!loading && !currentWeather && !error && (
            <div style={styles.placeholder}>
              Search for a city to see current weather and forecast
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;