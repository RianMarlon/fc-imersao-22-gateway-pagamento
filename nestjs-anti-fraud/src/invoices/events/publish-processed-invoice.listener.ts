import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InvoiceProcessedEvent } from './invoice-processed.event';
import { OnEvent } from '@nestjs/event-emitter';
import * as kafkaLib from '@confluentinc/kafka-javascript';

@Injectable()
export class PublishProcessedInvoiceListener implements OnModuleInit {
  private logger = new Logger(PublishProcessedInvoiceListener.name);
  private kafkaProducer: kafkaLib.KafkaJS.Producer;

  constructor(private readonly kafkaInstance: kafkaLib.KafkaJS.Kafka) {}

  async onModuleInit() {
    this.kafkaProducer = this.kafkaInstance.producer();
    await this.kafkaProducer.connect();
  }

  @OnEvent('invoice.processed')
  async handle(event: InvoiceProcessedEvent) {
    await this.kafkaProducer.send({
      topic: process.env.KAFKA_PRODUCER_TOPIC,
      messages: [
        {
          value: JSON.stringify({
            invoice_id: event.invoice.id,
            status: event.fraudResult.hasFraud ? 'rejected' : 'approved',
          }),
        },
      ],
    });

    this.logger.log(`Invoice ${event.invoice.id} processed event published`);
  }
}
