/*
  Warnings:

  - You are about to drop the column `split` on the `OrderBill` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderBill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "splitBy" INTEGER NOT NULL DEFAULT 1,
    "orderId" INTEGER,
    CONSTRAINT "OrderBill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderBill" ("id", "orderId", "price", "splitBy") SELECT "id", "orderId", "price", "splitBy" FROM "OrderBill";
DROP TABLE "OrderBill";
ALTER TABLE "new_OrderBill" RENAME TO "OrderBill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
