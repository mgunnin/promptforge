/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `ApiKey` table. All the data in the column will be lost.
  - You are about to drop the column `lastUsed` on the `ApiKey` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Prompt_embedding_idx";

-- AlterTable
ALTER TABLE "ApiKey" DROP COLUMN "expiresAt",
DROP COLUMN "lastUsed",
ALTER COLUMN "updatedAt" DROP DEFAULT;
