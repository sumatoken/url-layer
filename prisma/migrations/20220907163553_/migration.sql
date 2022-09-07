/*
  Warnings:

  - You are about to drop the column `linkId` on the `Visitor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Visitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Visitor" ("city", "country", "createdAt", "id", "ip", "updatedAt") SELECT "city", "country", "createdAt", "id", "ip", "updatedAt" FROM "Visitor";
DROP TABLE "Visitor";
ALTER TABLE "new_Visitor" RENAME TO "Visitor";
CREATE UNIQUE INDEX "Visitor_ip_key" ON "Visitor"("ip");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
