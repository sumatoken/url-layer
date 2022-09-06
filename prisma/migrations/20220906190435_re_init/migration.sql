/*
  Warnings:

  - Added the required column `campaignId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Link_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("createdAt", "id", "slug", "url") SELECT "createdAt", "id", "slug", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");
CREATE UNIQUE INDEX "Link_slug_key" ON "Link"("slug");
CREATE UNIQUE INDEX "Link_campaignId_key" ON "Link"("campaignId");
CREATE INDEX "Link_slug_idx" ON "Link"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
