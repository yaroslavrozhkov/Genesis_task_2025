import express from "express";
import { WeatherApiClient } from "../infrastructure/weather-api-client";
import { PrismaSubscriptionRepository } from "../infrastructure/prisma-subscription-repository";
import { WeatherService } from "../services/weather-service";
import { WeatherController } from "../controllers/weather-controller";

const router = express.Router();
const apiClient = new WeatherApiClient();
const subscriptionRepo = new PrismaSubscriptionRepository();
const service = new WeatherService(apiClient, subscriptionRepo);
const controller = new WeatherController(service);

router.get("/weather", controller.getWeather);
router.post("/subscribe", controller.subscribe);
router.get("/confirm/:token", controller.confirmSubscription);
router.get("/unsubscribe/:token", controller.unsubscribe);

export default router;