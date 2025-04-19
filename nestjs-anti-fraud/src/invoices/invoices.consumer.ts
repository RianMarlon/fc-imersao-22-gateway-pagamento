import { EventPattern, Payload } from '@nestjs/microservices';
import { FraudService } from './fraud/fraud.service';
import { Controller, Logger } from '@nestjs/common';

export type PendingInvoicesMessage = {
  account_id: string;
  amount: number;
  invoice_id: string;
};

@Controller()
export class InvoicesConsumer {
  private logger = new Logger(InvoicesConsumer.name);

  constructor(private fraudService: FraudService) {}

  @EventPattern('pending_transactions')
  async handlePendingInvoices(@Payload() message: PendingInvoicesMessage) {
    this.logger.log(`Processing invoice: ${message.invoice_id}`);
    await this.fraudService.processInvoice(message);
    this.logger.log(`Invoice processed: ${message.invoice_id}`);
  }
}
