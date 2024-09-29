-- CreateTable
CREATE TABLE `Doctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `specialty` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `experience` INTEGER NOT NULL,
    `patients` INTEGER NOT NULL,
    `availability` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `awards` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
