import { Request, Response } from "express";
import { IWeatherService } from "../interfaces/IWeatherService";

export class WeatherController {
  constructor(private weatherService: IWeatherService) {}

  getWeather = async (req: Request, res: Response) => {
    try {
      const city = req.query.city as string;
      const weather = await this.weatherService.getWeather(city);
      res.json(weather);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  subscribe = async (req: Request, res: Response) => {
    try {
      const { email, city, frequency } = req.body;
      await this.weatherService.subscribe(email, city, frequency);
      res.json({ message: "Subscription successful. Confirmation email sent." });
    } catch (err: any) {
      const status = err.message === "Email already subscribed" ? 409 : 400;
      res.status(status).json({ error: err.message });
    }
  };

  confirmSubscription = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      await this.weatherService.confirmSubscription(token);
      res.json({ message: "Subscription confirmed successfully" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  unsubscribe = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      await this.weatherService.unsubscribe(token);
      res.json({ message: "Unsubscribed successfully" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}