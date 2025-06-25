-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW', 'NOT_SET');

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NOT_SET',
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOT_STARTED';
