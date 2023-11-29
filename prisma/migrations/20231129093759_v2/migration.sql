/*
  Warnings:

  - Added the required column `status` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `status` ENUM('ON_SALE', 'SOLD_OUT') NOT NULL;
