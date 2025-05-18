import axios from "axios";
import { IWeatherApiClient } from "../interfaces/IWeatherApiClient";
import { Weather } from "../models/types";

export class WeatherApiClient implements IWeatherApiClient {
  async fetchWeather(city: string): Promise<Weather> {

    const API_KEY = process.env.WEATHER_API_KEY;

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=0&aqi=no&alerts=no`;

    const response = await axios.get(url);
    const data = response.data;

    return {
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
      description: data.current.condition.text,
    };
  }
}