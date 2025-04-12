import { Module } from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        INVOICES_HISTORY_COUNT: Joi.number().required(),
        SUSPICIOUS_VARIATION_PERCENTAGE: Joi.number().required(),
        SUSPICIOUS_TIMEFRAME_HOURS: Joi.number().required(),
        SUSPICIOUS_INVOICES_COUNT: Joi.number().required(),
      }),
    }),
    InvoicesModule,
    PrismaModule,
  ],
})
export class AppModule {}
