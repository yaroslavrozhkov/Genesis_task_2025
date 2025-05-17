import { IWeatherService } from "../interfaces/IWeatherService";
import { Weather } from "../models/types";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export class WeatherService implements IWeatherService {
  async getWeather(city: string): Promise<Weather> {
    if (!city) {
      throw new Error("City is required");
    }

    return {
      temperature: 21.5,
      humidity: 60,
      description: "Sunny",
    };
  }

  async subscribe(email: string, city: string, frequency: string): Promise<void> {
    const existing = await prisma.subscription.findFirst({ where: { email, city } });
    if (existing) throw new Error("Email already subscribed");

    const token = uuidv4();

    await prisma.subscription.create({
      data: {
        email,
        city,
        frequency,
        token,
      },
    });

    console.log(`Send confirmation email with token: ${token}`);
  }

  async confirmSubscription(token: string): Promise<void> {
    const subscription = await prisma.subscription.findUnique({ where: { token } });
    if (!subscription) throw new Error("Token not found");

    await prisma.subscription.update({
      where: { token },
      data: { confirmed: true },
    });
  }

  async unsubscribe(token: string): Promise<void> {
    const subscription = await prisma.subscription.findUnique({ where: { token } });
    if (!subscription) throw new Error("Token not found");

    await prisma.subscription.delete({ where: { token } });
  }
}