-- CreateTable
CREATE TABLE "Corporal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoUrl" TEXT,
    "responsibilities" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Corporal_pkey" PRIMARY KEY ("id")
);
