import express from "express";
import { WeatherApiClient } from "../infrastructure/WeatherApiClient";
import { PrismaSubscriptionRepository } from "../infrastructure/PrismaSubscriptionRepository";
import { WeatherService } from "../services/weatherService";
import { WeatherController } from "../controllers/weatherController";

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