import { Injectable } from '@nestjs/common';
import { InvoiceStatus } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import { ProcessInvoiceFraudDto } from '../dto/process-invoice-fraud.dto';
import { FraudAggregateSpecification } from './specifications/fraud-aggregate.specification';
import { InvoiceProcessedEvent } from '../events/invoice-processed.event';

@Injectable()
export class FraudService {
  constructor(
    private prismaService: PrismaService,
    private fraudAggregateSpecification: FraudAggregateSpecification,
    private eventEmitter: EventEmitter2,
  ) {}

  async processInvoice(input: ProcessInvoiceFraudDto) {
    const { account_id, invoice_id, amount } = input;

    const foundInvoice = await this.prismaService.invoice.findUnique({
      where: {
        id: invoice_id,
      },
    });

    if (foundInvoice) {
      throw new Error('Invoice has already been processed');
    }

    // insert or update account
    const account = await this.prismaService.account.upsert({
      where: {
        id: account_id,
      },
      update: {},
      create: {
        id: account_id,
      },
    });

    const fraudResult = await this.fraudAggregateSpecification.detectFraud({
      accountId: account.id,
      amount,
      invoiceId: invoice_id,
    });

    const invoice = await this.prismaService.invoice.create({
      data: {
        id: invoice_id,
        amount,
        status: fraudResult.hasFraud
          ? InvoiceStatus.REJECTED
          : InvoiceStatus.APPROVED,
        ...(fraudResult.hasFraud && {
          fraudHistory: {
            create: {
              reason: fraudResult.reason!,
              description: fraudResult.description,
            },
          },
        }),
        accountId: account.id,
      },
    });

    await this.eventEmitter.emitAsync(
      'invoice.processed',
      new InvoiceProcessedEvent(invoice, fraudResult),
    );

    return {
      invoice,
      fraudResult,
    };
  }
}
