/*
  Warnings:

  - You are about to drop the column `ingredients` on the `MenuEntry` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MenuEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "menuId" INTEGER,
    CONSTRAINT "MenuEntry_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MenuEntry" ("id", "menuId", "name", "price") SELECT "id", "menuId", "name", "price" FROM "MenuEntry";
DROP TABLE "MenuEntry";
ALTER TABLE "new_MenuEntry" RENAME TO "MenuEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
