/*
  Warnings:

  - You are about to drop the column `availability` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `awards` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `contactId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Doctor` DROP COLUMN `availability`,
    DROP COLUMN `awards`,
    DROP COLUMN `email`,
    DROP COLUMN `image_url`,
    DROP COLUMN `phone`,
    DROP COLUMN `website`,
    ADD COLUMN `contactId` INTEGER NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Availability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` VARCHAR(191) NOT NULL,
    `doctorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Award` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `doctorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Availability` ADD CONSTRAINT `Availability_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Award` ADD CONSTRAINT `Award_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
