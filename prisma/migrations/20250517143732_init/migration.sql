-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_token_key" ON "Subscription"("token");
