-- CreateEnum
CREATE TYPE "invoice_status" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "invoice_status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
