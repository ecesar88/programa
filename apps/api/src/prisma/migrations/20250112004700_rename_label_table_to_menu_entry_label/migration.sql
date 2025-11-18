/*
  Warnings:

  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Label";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MenuEntryLabel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "color" TEXT,
    "menuEntryId" INTEGER,
    CONSTRAINT "MenuEntryLabel_menuEntryId_fkey" FOREIGN KEY ("menuEntryId") REFERENCES "MenuEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
