/*
  Warnings:

  - Added the required column `source` to the `VisitorsOnLinks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VisitorsOnLinks" (
    "linkId" INTEGER NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "visitedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("linkId", "visitorId"),
    CONSTRAINT "VisitorsOnLinks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VisitorsOnLinks_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VisitorsOnLinks" ("linkId", "visitedAt", "visitorId") SELECT "linkId", "visitedAt", "visitorId" FROM "VisitorsOnLinks";
DROP TABLE "VisitorsOnLinks";
ALTER TABLE "new_VisitorsOnLinks" RENAME TO "VisitorsOnLinks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
