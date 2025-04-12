import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FraudReason } from '@prisma/client';
import {
  IFraudSpecification,
  FraudSpecificationInput,
  FraudSpecificationOutput,
} from './fraud-specification.interface';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UnusualAmountSpecification implements IFraudSpecification {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async detectFraud(
    input: FraudSpecificationInput,
  ): Promise<FraudSpecificationOutput> {
    const INVOICES_HISTORY_COUNT = this.configService.getOrThrow<number>(
      'INVOICES_HISTORY_COUNT',
    );
    const SUSPICIOUS_VARIATION_PERCENTAGE =
      this.configService.getOrThrow<number>('SUSPICIOUS_VARIATION_PERCENTAGE');

    const previousInvoices = await this.prismaService.invoice.findMany({
      where: {
        accountId: input.accountId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: INVOICES_HISTORY_COUNT,
    });

    if (previousInvoices.length) {
      const totalAmount = previousInvoices.reduce(
        (acc, invoice) => acc + invoice.amount,
        0,
      );
      const average = totalAmount / previousInvoices.length;

      if (input.amount > average * (SUSPICIOUS_VARIATION_PERCENTAGE / 100)) {
        return {
          hasFraud: true,
          reason: FraudReason.UNUSUAL_PATTERN,
          description: `Transaction amount ${input.amount} is unusual compared to average ${average}`,
        };
      }
    }

    return {
      hasFraud: false,
    };
  }
}
