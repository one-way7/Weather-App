import { format } from 'date-fns';

class Api {
  #API_KEY = '36250eb3fcdd42aaacd84443230912';

  #processData = (data) => {
    const { location, current, forecast } = data;

    const processedData = {
      city: location.name,
      current: {
        time: format(new Date(location.localtime), 'hh:mm - cccc, d MMM yyyy'),
        tempC: Math.round(current.temp_c),
        cloudy: current.cloud,
        windSpeed: Math.round(current.wind_kph),
        humidity: current.humidity,
        rain: Math.round(current.precip_mm),
        weatherCondition: current.condition.text,
        iconUrl: current.condition.icon,
      },
      daily: [],
    };

    for (let i = 0; i < 3; i += 1) {
      processedData.daily[i] = {
        day: format(new Date(forecast.forecastday[i].date), 'EEE'),
        minTempC: Math.round(forecast.forecastday[i].day.mintemp_c),
        maxTempC: Math.round(forecast.forecastday[i].day.maxtemp_c),
        iconUrl: forecast.forecastday[i].day.condition.icon,
      };
    }

    return processedData;
  };

  getWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${this.#API_KEY}&q=${city}&days=3&aqi=no&alerts=no`,
      );
      const weatherData = await response.json();

      if (weatherData.error) return weatherData;

      return this.#processData(weatherData);
    } catch (error) {
      return { code: error.name, message: error.message };
    }
  };
}

export default Api;
