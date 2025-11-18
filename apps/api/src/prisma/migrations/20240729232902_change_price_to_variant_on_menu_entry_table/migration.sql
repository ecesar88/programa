/*
  Warnings:

  - You are about to drop the `MenuEntryPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MenuEntryPrice";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MenuEntryVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL,
    "name" TEXT,
    "description" TEXT,
    "menuEntryId" INTEGER,
    CONSTRAINT "MenuEntryVariant_menuEntryId_fkey" FOREIGN KEY ("menuEntryId") REFERENCES "MenuEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
