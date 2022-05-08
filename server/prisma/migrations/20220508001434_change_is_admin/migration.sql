-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN
);
INSERT INTO "new_users" ("email", "id", "isAdmin", "name", "password") SELECT "email", "id", "isAdmin", "name", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
