-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "color" TEXT,
    "menuEntryId" INTEGER,
    CONSTRAINT "Label_menuEntryId_fkey" FOREIGN KEY ("menuEntryId") REFERENCES "MenuEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Label" ("color", "id", "menuEntryId", "name") SELECT "color", "id", "menuEntryId", "name" FROM "Label";
DROP TABLE "Label";
ALTER TABLE "new_Label" RENAME TO "Label";
CREATE TABLE "new_MenuEntryCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "menuId" INTEGER,
    "menuEntryId" INTEGER,
    CONSTRAINT "MenuEntryCategory_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MenuEntryCategory_menuEntryId_fkey" FOREIGN KEY ("menuEntryId") REFERENCES "MenuEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MenuEntryCategory" ("id", "menuEntryId", "menuId", "name") SELECT "id", "menuEntryId", "menuId", "name" FROM "MenuEntryCategory";
DROP TABLE "MenuEntryCategory";
ALTER TABLE "new_MenuEntryCategory" RENAME TO "MenuEntryCategory";
CREATE UNIQUE INDEX "MenuEntryCategory_menuId_key" ON "MenuEntryCategory"("menuId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
