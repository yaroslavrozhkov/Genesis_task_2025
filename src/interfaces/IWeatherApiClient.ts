import { Weather } from "../models/types";

export interface IWeatherApiClient {
  fetchWeather(city: string): Promise<Weather>;
}