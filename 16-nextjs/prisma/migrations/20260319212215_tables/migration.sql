/*
  Warnings:

  - You are about to drop the column `manufacturer` on the `Console` table. All the data in the column will be lost.
  - You are about to drop the column `releasedate` on the `Console` table. All the data in the column will be lost.
  - You are about to drop the column `releasedate` on the `Game` table. All the data in the column will be lost.
  - Added the required column `manuFacturer` to the `Console` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Console` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Console" DROP COLUMN "manufacturer",
DROP COLUMN "releasedate",
ADD COLUMN     "manuFacturer" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "releasedate",
ADD COLUMN     "releaseDate" TIMESTAMP(0) NOT NULL;
