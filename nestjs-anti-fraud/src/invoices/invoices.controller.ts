import { Controller, Query, Get, Param } from '@nestjs/common';
import { FindAllInvoiceDto } from './dto/find-all-invoice.dto';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll(@Query() query: FindAllInvoiceDto) {
    return this.invoicesService.findAll({
      withFraud: query.with_fraud,
      accountId: query.account_id,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }
}
