import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/database/product.schema';
import globalConstants from 'src/global';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async createNew(product: Product) {
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

  async updateOneInventoryItemQuantity(targetDocId: string, updatedQuantity: number) {
    try {
      const result = await this.productModel.updateOne({ _id: targetDocId }, {
        quantity: updatedQuantity
      })
      if (result) {
        return result.modifiedCount
      }
    } catch(error) {
      console.log(error.message);
      throw error.message;
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
