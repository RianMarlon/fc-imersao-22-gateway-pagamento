import { Injectable } from '@nestjs/common';
import { FraudReason } from '@prisma/client';
import {
  IFraudSpecification,
  FraudSpecificationInput,
  FraudSpecificationOutput,
} from './fraud-specification.interface';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SuspiciousAccountSpecification implements IFraudSpecification {
  constructor(private readonly prismaService: PrismaService) {}

  async detectFraud(
    input: FraudSpecificationInput,
  ): Promise<FraudSpecificationOutput> {
    const account = await this.prismaService.account.findUnique({
      where: {
        id: input.accountId,
      },
    });

    if (account.isSuspicious) {
      return {
        hasFraud: true,
        reason: FraudReason.SUSPICIOUS_ACCOUNT,
        description: `Account ${input.accountId} is marked as suspicious`,
      };
    }

    return {
      hasFraud: false,
    };
  }
}
