import { PrismaClient } from "@prisma/client";
import { WeatherService } from "./weatherService";
import { WeatherApiClient } from "../infrastructure/WeatherApiClient";
import { PrismaSubscriptionRepository } from "../infrastructure/PrismaSubscriptionRepository";
import { sendEmail } from "../utils/emailService";

const prisma = new PrismaClient();

async function processSubscriptions() {
  const now = new Date();
  const apiClient = new WeatherApiClient();
  const subscriptionRepo = new PrismaSubscriptionRepository();
  const weatherService = new WeatherService(apiClient, subscriptionRepo);
  const serviceUrl = process.env.SERVICE_URL;

  const subscriptions = await prisma.subscription.findMany({
    where: { confirmed: true },
  });

  for (const sub of subscriptions) {
    const shouldSend =
      sub.frequency === 1
        ? !sub.lastSentAt || new Date(now.getTime() - 60 * 60 * 1000) > sub.lastSentAt  
        : !sub.lastSentAt || new Date(now.getTime() - 24 * 60 * 60 * 1000) > sub.lastSentAt;

    if (!shouldSend) continue;

    const weather = await weatherService.getWeather(sub.city);

    await sendEmail(
        sub.email,
        `Weather update for ${sub.city}`,
        `
          <p><b>City:</b> ${sub.city}</p>
          <p><b>Temperature:</b> ${weather.temperature}°C</p>
          <p><b>Humidity:</b> ${weather.humidity}%</p>
          <p><b>Description:</b> ${weather.description}</p>
          <p><a href="${serviceUrl}/api/unsubscribe/${sub.token}">Unsubscribe</a></p>
        `
      );

    await prisma.subscription.update({
      where: { id: sub.id },
      data: { lastSentAt: now },
    });

    console.log(`Email sent to ${sub.email} for ${sub.city}`);
  }
}

processSubscriptions()
  .catch(console.error)
  .finally(() => prisma.$disconnect());