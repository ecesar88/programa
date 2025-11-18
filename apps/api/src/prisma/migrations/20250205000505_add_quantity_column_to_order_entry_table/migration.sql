/*
  Warnings:

  - Added the required column `quantity` to the `OrderEntry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER,
    "menuEntryId" INTEGER NOT NULL,
    CONSTRAINT "OrderEntry_menuEntryId_fkey" FOREIGN KEY ("menuEntryId") REFERENCES "MenuEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderEntry_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OrderEntry" ("id", "menuEntryId", "orderId") SELECT "id", "menuEntryId", "orderId" FROM "OrderEntry";
DROP TABLE "OrderEntry";
ALTER TABLE "new_OrderEntry" RENAME TO "OrderEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
