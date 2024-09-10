-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_listId_fkey";

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "listId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "taskList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
