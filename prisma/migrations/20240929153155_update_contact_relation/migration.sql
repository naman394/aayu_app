/*
  Warnings:

  - A unique constraint covering the columns `[contactId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Doctor_contactId_key` ON `Doctor`(`contactId`);
