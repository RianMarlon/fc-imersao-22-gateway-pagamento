import { Invoice } from '@prisma/client';
import { FraudSpecificationOutput } from '../fraud/specifications/fraud-specification.interface';

export class InvoiceProcessedEvent {
  constructor(
    readonly invoice: Invoice,
    readonly fraudResult: FraudSpecificationOutput,
  ) {}
}
