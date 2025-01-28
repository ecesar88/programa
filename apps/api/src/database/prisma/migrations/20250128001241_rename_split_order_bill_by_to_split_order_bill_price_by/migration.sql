/*
  Warnings:

  - You are about to drop the column `splitBy` on the `OrderBill` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `OrderObservation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "totalPrice" REAL NOT NULL,
    "splitOrderPriceBy" INTEGER NOT NULL DEFAULT 1,
    "clientId" INTEGER,
    CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("address", "clientId", "dateTime", "id", "totalPrice") SELECT "address", "clientId", "dateTime", "id", "totalPrice" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderBill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "OrderBill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderBill" ("id", "orderId", "price") SELECT "id", "orderId", "price" FROM "OrderBill";
DROP TABLE "OrderBill";
ALTER TABLE "new_OrderBill" RENAME TO "OrderBill";
CREATE TABLE "new_OrderObservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "OrderObservation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderObservation" ("content", "id", "orderId") SELECT "content", "id", "orderId" FROM "OrderObservation";
DROP TABLE "OrderObservation";
ALTER TABLE "new_OrderObservation" RENAME TO "OrderObservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
