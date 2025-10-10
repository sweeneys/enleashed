-- CreateEnum
CREATE TYPE "ChiefRole" AS ENUM ('WARRIOR', 'BUILDER', 'INVIGILATOR', 'TEACHER');

-- CreateTable
CREATE TABLE "ChiefApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoUrl" TEXT,
    "responsibilities" TEXT NOT NULL,
    "pitch" TEXT NOT NULL,
    "role" "ChiefRole" NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ChiefApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Soldier" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "country" TEXT,
    "photoUrl" TEXT,
    "supports" BOOLEAN NOT NULL,

    CONSTRAINT "Soldier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistSuggestion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "PlaylistSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChiefApplication_role_approved_idx" ON "ChiefApplication"("role", "approved");

-- CreateIndex
CREATE INDEX "Soldier_supports_idx" ON "Soldier"("supports");
