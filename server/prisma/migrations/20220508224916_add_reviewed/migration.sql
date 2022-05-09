-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_feedbacks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "screenshot" TEXT,
    "wasReviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "feedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_feedbacks" ("comment", "id", "screenshot", "type", "userId") SELECT "comment", "id", "screenshot", "type", "userId" FROM "feedbacks";
DROP TABLE "feedbacks";
ALTER TABLE "new_feedbacks" RENAME TO "feedbacks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
