/*
  Warnings:

  - Added the required column `bandId` to the `tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "bandId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "tracks_bandId_idx" ON "tracks"("bandId");

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "bands"("id") ON DELETE CASCADE ON UPDATE CASCADE;
