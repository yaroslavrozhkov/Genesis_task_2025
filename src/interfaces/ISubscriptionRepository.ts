import { Subscription } from "@prisma/client";

export interface ISubscriptionRepository {
  findByEmailAndCity(email: string, city: string): Promise<Subscription | null>;
  create(email: string, city: string, frequency: number, token: string): Promise<void>;
  findByToken(token: string): Promise<Subscription | null>;
  confirm(token: string): Promise<void>;
  deleteByToken(token: string): Promise<void>;
}