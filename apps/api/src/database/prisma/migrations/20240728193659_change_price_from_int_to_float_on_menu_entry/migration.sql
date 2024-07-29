/*
  Warnings:

  - You are about to alter the column `price` on the `MenuEntry` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MenuEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "menuId" INTEGER,
    CONSTRAINT "MenuEntry_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MenuEntry" ("description", "id", "menuId", "name", "price") SELECT "description", "id", "menuId", "name", "price" FROM "MenuEntry";
DROP TABLE "MenuEntry";
ALTER TABLE "new_MenuEntry" RENAME TO "MenuEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
