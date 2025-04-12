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
export class FrequentHighValueSpecification implements IFraudSpecification {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async detectFraud(
    input: FraudSpecificationInput,
  ): Promise<FraudSpecificationOutput> {
    const { accountId } = input;
    const SUSPICIOUS_TIMEFRAME_HOURS = this.configService.getOrThrow<number>(
      'SUSPICIOUS_TIMEFRAME_HOURS',
    );
    const SUSPICIOUS_INVOICES_COUNT = this.configService.getOrThrow<number>(
      'SUSPICIOUS_INVOICES_COUNT',
    );

    const recentDate = new Date();
    recentDate.setHours(recentDate.getHours() - SUSPICIOUS_TIMEFRAME_HOURS);

    const recentInvoices = await this.prismaService.invoice.findMany({
      where: {
        accountId: input.accountId,
        createdAt: {
          gte: recentDate,
        },
      },
    });

    if (recentInvoices.length >= SUSPICIOUS_INVOICES_COUNT) {
      await this.prismaService.account.update({
        where: {
          id: accountId,
        },
        data: {
          isSuspicious: true,
        },
      });

      return {
        hasFraud: true,
        reason: FraudReason.FREQUENT_HIGH_VALUE,
        description: `Account has made ${recentInvoices.length} high value transactions in the last ${SUSPICIOUS_TIMEFRAME_HOURS} hours`,
      };
    }

    return {
      hasFraud: false,
    };
  }
}
