/*
  Warnings:

  - Added the required column `lnglat` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "lnglat" TEXT NOT NULL
);
INSERT INTO "new_Project" ("address", "id", "number") SELECT "address", "id", "number" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
