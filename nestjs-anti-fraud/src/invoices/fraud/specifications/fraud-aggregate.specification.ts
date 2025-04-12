import { Injectable, Inject } from '@nestjs/common';
import {
  IFraudSpecification,
  FraudSpecificationInput,
  FraudSpecificationOutput,
} from './fraud-specification.interface';

@Injectable()
export class FraudAggregateSpecification implements IFraudSpecification {
  constructor(
    @Inject('FRAUD_SPECIFICATIONS')
    private readonly specifications: IFraudSpecification[],
  ) {}

  async detectFraud(
    input: FraudSpecificationInput,
  ): Promise<FraudSpecificationOutput> {
    for (const specification of this.specifications) {
      const result = await specification.detectFraud(input);
      if (result.hasFraud) {
        return result;
      }
    }

    return {
      hasFraud: false,
    };
  }
}
