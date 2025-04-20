import { Module } from '@nestjs/common';
import { FraudService } from './fraud/fraud.service';
import { FrequentHighValueSpecification } from './fraud/specifications/frequent-high-value.specification';
import { SuspiciousAccountSpecification } from './fraud/specifications/suspicious-account.specification';
import { UnusualAmountSpecification } from './fraud/specifications/unusual-amount.specification';
import { FraudAggregateSpecification } from './fraud/specifications/fraud-aggregate.specification';
import { PrismaModule } from '../prisma/prisma.module';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { InvoicesConsumer } from './invoices.consumer';
import * as kafkaLib from '@confluentinc/kafka-javascript';
import { PublishProcessedInvoiceListener } from './events/publish-processed-invoice.listener';

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
    {
      provide: kafkaLib.KafkaJS.Kafka,
      useValue: new kafkaLib.KafkaJS.Kafka({
        'bootstrap.servers': process.env.KAFKA_BROKER,
      }),
    },
    InvoicesService,
    PublishProcessedInvoiceListener,
  ],
  exports: [FraudService],
  controllers: [InvoicesController, InvoicesConsumer],
})
export class InvoicesModule {}
