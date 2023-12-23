import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { productProviders } from './products.providers';
import { mongoDbProviders } from 'src/database/mongoDb.providers';

@Module({
  controllers: [InventoryController],
  providers: [
    InventoryService,
    ...productProviders,
    ...mongoDbProviders
  ]
})
export class InventoryModule {}
