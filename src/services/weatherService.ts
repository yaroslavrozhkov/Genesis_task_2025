import { IWeatherService } from "../interfaces/IWeatherService";
import { IWeatherApiClient } from "../interfaces/IWeatherApiClient";
import { ISubscriptionRepository } from "../interfaces/ISubscriptionRepository";
import { Weather } from "../models/types";

import { sendEmail } from "../utils/emailService";

import { v4 as uuidv4 } from "uuid";

export class WeatherService implements IWeatherService {
  constructor(
    private weatherApiClient: IWeatherApiClient,
    private subscriptionRepo: ISubscriptionRepository
  ) {}

  async getWeather(city: string): Promise<Weather> {
    if (!city) throw new Error("City is required");

    return this.weatherApiClient.fetchWeather(city);
  }

  async subscribe(email: string, city: string, frequency: string): Promise<void> {
    const existing = await this.subscriptionRepo.findByEmailAndCity(email, city);
    if (existing) throw new Error("Email already subscribed");

    let frequencyValue: number;
    if (frequency.toLowerCase() === "hourly") {
      frequencyValue = 1;
    } else if (frequency.toLowerCase() === "daily") {
      frequencyValue = 2;
    } else {
      throw new Error("Invalid frequency. Must be 'hourly' or 'daily'");
    }

    try {
      await this.getWeather(city);
    } catch (error) {
      throw new Error(`Invalid city: "${city}". Weather data could not be retrieved.`);
    }

    const token = uuidv4();
    await this.subscriptionRepo.create(email, city, frequencyValue, token);

    await sendEmail(
      email,
      "Weather Update : Confirmation token",
      `<p>Use this token to confirm Your subscribe ${token}</p>`
    );

    console.log(`Send confirmation email with token: ${token}`);
  }

  async confirmSubscription(token: string): Promise<void> {
    const subscription = await this.subscriptionRepo.findByToken(token);
    if (!subscription) throw new Error("Token not found");

    await this.subscriptionRepo.confirm(token);
  }

  async unsubscribe(token: string): Promise<void> {
    const subscription = await this.subscriptionRepo.findByToken(token);
    if (!subscription) throw new Error("Token not found");

    await this.subscriptionRepo.deleteByToken(token);
  }
}