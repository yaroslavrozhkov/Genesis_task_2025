import express from "express";
import { WeatherService } from "../services/weatherService";
import { WeatherController } from "../controllers/weatherController";

const router = express.Router();
const service = new WeatherService();
const controller = new WeatherController(service);

router.get("/weather", controller.getWeather);
router.post("/subscribe", controller.subscribe);
router.get("/confirm/:token", controller.confirmSubscription);
router.get("/unsubscribe/:token", controller.unsubscribe);

export default router;