/*
  Warnings:

  - Added the required column `listId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "listId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "taskList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
