import { PrismaClient } from "@prisma/client";
import { ISubscriptionRepository } from "../interfaces/ISubscriptionRepository";

const prisma = new PrismaClient();

export class PrismaSubscriptionRepository implements ISubscriptionRepository {
  async findByEmailAndCity(email: string, city: string) {
    return prisma.subscription.findFirst({ where: { email, city } });
  }

  async create(email: string, city: string, frequency: number, token: string) {
    await prisma.subscription.create({
      data: { email, city, frequency, token },
    });
  }

  async findByToken(token: string) {
    return prisma.subscription.findUnique({ where: { token } });
  }

  async confirm(token: string) {
    await prisma.subscription.update({
      where: { token },
      data: { confirmed: true },
    });
  }

  async deleteByToken(token: string) {
    await prisma.subscription.delete({ where: { token } });
  }
}