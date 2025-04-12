-- CreateEnum
CREATE TYPE "fraud_reason" AS ENUM ('SUSPICIOUS_ACCOUNT', 'UNUSUAL_PATTERN', 'FREQUENT_HIGH_VALUE');

-- CreateTable
CREATE TABLE "fraud_history" (
    "id" TEXT NOT NULL,
    "reason" "fraud_reason" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "invoice_id" TEXT NOT NULL,

    CONSTRAINT "fraud_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fraud_history_invoice_id_key" ON "fraud_history"("invoice_id");

-- AddForeignKey
ALTER TABLE "fraud_history" ADD CONSTRAINT "fraud_history_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
