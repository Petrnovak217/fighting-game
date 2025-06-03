

  const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
  const weatherToken = "key=6ZJ2B3DZYABHXGLETWHJXK3BA";

  let cityName = document.getElementById("city-name");
  let weatherType = document.getElementById("weather-type");
  let temp = document.getElementById("temp");
  let minTemp = document.getElementById("min-temp");
  let maxTemp = document.getElementById("max-temp");

  const getWeatherData = async (city) => {
    try {
      const response = await fetch(`${url}/${city}?${weatherToken}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      let weatherInfo = {
        cityName: data.address,
        weatherType: data.currentConditions.conditions,
        temp: Math.round(5/9 * (data.currentConditions.temp - 32)),
        minTemp: Math.round(5/9 * (data.days[0].tempmin - 32)) ,
        maxTemp: Math.round(5/9 * (data.days[0].tempmax - 32)),
      };

      showWeatherData(weatherInfo);

    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch weather data. Please try again.");
    }
  };

  const searchCity = () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherData(city);
      } else {
        alert("Please enter a city name.");
      }
  
  
  }

  const showWeatherData = (weatherData) => {
    cityName.innerText = weatherData.cityName;
    weatherType.innerText = weatherData.weatherType;
    temp.innerText = weatherData.temp;
    minTemp.innerText = weatherData.minTemp;
    maxTemp.innerText = weatherData.maxTemp;

  }