import { FraudReason } from '@prisma/client';

export interface FraudSpecificationInput {
  accountId: string;
  amount: number;
  invoiceId: string;
}

export interface FraudSpecificationOutput {
  hasFraud: boolean;
  reason?: FraudReason;
  description?: string;
}

export interface IFraudSpecification {
  detectFraud(
    input: FraudSpecificationInput,
  ): Promise<FraudSpecificationOutput> | FraudSpecificationOutput;
}
