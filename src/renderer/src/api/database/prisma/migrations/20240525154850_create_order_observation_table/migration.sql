-- CreateTable
CREATE TABLE "OrderObservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER,
    CONSTRAINT "OrderObservation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
