-- CreateTable
CREATE TABLE "OrderEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER,
    "menuEntryId" INTEGER NOT NULL,
    CONSTRAINT "OrderEntry_menuEntryId_fkey" FOREIGN KEY ("menuEntryId") REFERENCES "MenuEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderEntry_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderEntryObservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "orderEntryId" INTEGER,
    CONSTRAINT "OrderEntryObservation_orderEntryId_fkey" FOREIGN KEY ("orderEntryId") REFERENCES "OrderEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
