import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/database/product.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Product.name,
      schema: ProductSchema
    }]),
    JwtModule
  ],
  controllers: [InventoryController],
  providers: [InventoryService, AuthGuard]
})
export class InventoryModule {}
