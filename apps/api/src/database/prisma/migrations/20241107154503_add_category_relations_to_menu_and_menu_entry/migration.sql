-- CreateTable
CREATE TABLE "MenuEntryCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "menuId" INTEGER,
    "menuEntryId" INTEGER,
    CONSTRAINT "MenuEntryCategory_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MenuEntryCategory_menuEntryId_fkey" FOREIGN KEY ("menuEntryId") REFERENCES "MenuEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuEntryCategory_menuId_key" ON "MenuEntryCategory"("menuId");
