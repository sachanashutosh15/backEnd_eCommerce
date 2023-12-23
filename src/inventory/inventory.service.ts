import { Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Product } from './product.interface';
import globalConstants from 'src/global';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: mongoose.Model<Product>
  ) {}

  async createNew(product: globalConstants.inventoryItem) {
    try {
      const newProduct = new this.productModel(product)
      const result = await newProduct.save();
      return result;
    } catch (error) {
      console.log(error);
      throw error.message;
    }
  }

  async findAll() {
    try {
      return this.productModel.find().exec();
    } catch(error) {
      console.log(error);
      throw error.message;
    }
  }

  async setItemQuantity(targetDocId: string, updatedQuantity: number) {
    try {
      const result = await this.productModel.updateOne(
        { _id: targetDocId },
        { quantity: updatedQuantity }
      )
      if (result) {
        return result.modifiedCount
      }
    } catch(error) {
      console.log(error.message);
      throw error.message;
    }
  }

  async updateProductQuantity(orderQuantity: number, productId: mongoose.Schema.Types.ObjectId) {
    try {
      const result = await this.productModel.updateOne(
        { _id: productId},
        { $inc: { quantity: -orderQuantity }}
      )
      console.log(result);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }


  async deleteOneInventoryItem(targetDocId: string) {
    try {
      const result = await this.productModel.deleteOne({ _id: targetDocId});
      if (result) {
        console.log(result);
        return result;
      } else {
        throw {
          message: "Internal server error"
        }
      }
    } catch(error) {
      console.log(error.message);
      throw error.message;
    }
  }
}
