/*
  Warnings:

  - You are about to drop the column `food` on the `Order` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "OrderBill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "split" BOOLEAN NOT NULL,
    "splitBy" INTEGER NOT NULL DEFAULT 1,
    "orderId" INTEGER,
    CONSTRAINT "OrderBill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MenuEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "menuId" INTEGER,
    "orderId" INTEGER,
    CONSTRAINT "MenuEntry_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MenuEntry_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MenuEntry" ("description", "id", "menuId", "name") SELECT "description", "id", "menuId", "name" FROM "MenuEntry";
DROP TABLE "MenuEntry";
ALTER TABLE "new_MenuEntry" RENAME TO "MenuEntry";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "totalPrice" REAL NOT NULL,
    "clientId" INTEGER,
    CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("address", "clientId", "dateTime", "id") SELECT "address", "clientId", "dateTime", "id" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderObservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER,
    CONSTRAINT "OrderObservation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderObservation" ("content", "dateTime", "id", "orderId") SELECT "content", "dateTime", "id", "orderId" FROM "OrderObservation";
DROP TABLE "OrderObservation";
ALTER TABLE "new_OrderObservation" RENAME TO "OrderObservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
