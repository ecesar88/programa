/*
  Warnings:

  - You are about to drop the column `price` on the `MenuEntry` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "MenuEntryPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" REAL NOT NULL,
    "menuEntryId" INTEGER,
    CONSTRAINT "MenuEntryPrice_menuEntryId_fkey" FOREIGN KEY ("menuEntryId") REFERENCES "MenuEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MenuEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "menuId" INTEGER,
    CONSTRAINT "MenuEntry_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MenuEntry" ("description", "id", "menuId", "name") SELECT "description", "id", "menuId", "name" FROM "MenuEntry";
DROP TABLE "MenuEntry";
ALTER TABLE "new_MenuEntry" RENAME TO "MenuEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
