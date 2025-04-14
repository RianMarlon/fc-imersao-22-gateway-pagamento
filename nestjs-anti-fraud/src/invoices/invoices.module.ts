import { Module } from '@nestjs/common';
import { FraudService } from './fraud/fraud.service';
import { FrequentHighValueSpecification } from './fraud/specifications/frequent-high-value.specification';
import { SuspiciousAccountSpecification } from './fraud/specifications/suspicious-account.specification';
import { UnusualAmountSpecification } from './fraud/specifications/unusual-amount.specification';
import { FraudAggregateSpecification } from './fraud/specifications/fraud-aggregate.specification';
import { PrismaModule } from '../prisma/prisma.module';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    FraudService,
    FraudAggregateSpecification,
    FrequentHighValueSpecification,
    SuspiciousAccountSpecification,
    UnusualAmountSpecification,
    {
      provide: 'FRAUD_SPECIFICATIONS',
      useFactory: (
        suspiciousAccountSpec: SuspiciousAccountSpecification,
        unusualAmountSpec: UnusualAmountSpecification,
        frequentHighValueSpec: FrequentHighValueSpecification,
      ) => [suspiciousAccountSpec, unusualAmountSpec, frequentHighValueSpec],
      inject: [
        SuspiciousAccountSpecification,
        UnusualAmountSpecification,
        FrequentHighValueSpecification,
      ],
    },
    InvoicesService,
  ],
  exports: [FraudService],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
