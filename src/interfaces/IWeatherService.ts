import { Weather } from "../models/types";

export interface IWeatherService {
  getWeather(city: string): Promise<Weather>;
  subscribe(email: string, city: string, frequency: string): Promise<void>;
  confirmSubscription(token: string): Promise<void>;
  unsubscribe(token: string): Promise<void>;
}