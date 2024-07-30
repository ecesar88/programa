-- CreateTable
CREATE TABLE "Label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "menuEntryId" INTEGER,
    CONSTRAINT "Label_menuEntryId_fkey" FOREIGN KEY ("menuEntryId") REFERENCES "MenuEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
