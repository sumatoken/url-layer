/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Campaign` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Visitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Visitor" ("city", "country", "createdAt", "id", "ip") SELECT "city", "country", "createdAt", "id", "ip" FROM "Visitor";
DROP TABLE "Visitor";
ALTER TABLE "new_Visitor" RENAME TO "Visitor";
CREATE UNIQUE INDEX "Visitor_ip_key" ON "Visitor"("ip");
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Link_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("campaignId", "createdAt", "id", "slug", "url") SELECT "campaignId", "createdAt", "id", "slug", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");
CREATE UNIQUE INDEX "Link_slug_key" ON "Link"("slug");
CREATE UNIQUE INDEX "Link_campaignId_key" ON "Link"("campaignId");
CREATE INDEX "Link_slug_idx" ON "Link"("slug");
CREATE TABLE "new_Campaign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Campaign" ("createdAt", "id", "slug", "url") SELECT "createdAt", "id", "slug", "url" FROM "Campaign";
DROP TABLE "Campaign";
ALTER TABLE "new_Campaign" RENAME TO "Campaign";
CREATE UNIQUE INDEX "Campaign_url_key" ON "Campaign"("url");
CREATE UNIQUE INDEX "Campaign_slug_key" ON "Campaign"("slug");
CREATE INDEX "Campaign_slug_idx" ON "Campaign"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
