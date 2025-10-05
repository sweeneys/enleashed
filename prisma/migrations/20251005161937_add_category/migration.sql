-- CreateEnum
CREATE TYPE "Category" AS ENUM ('STORY', 'ESSAY', 'CODE', 'RESULTS');

-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'ESSAY';
