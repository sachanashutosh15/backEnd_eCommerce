import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/database/order.schema';
import { Product, ProductDocument } from 'src/database/product.schema';
import { User, UserDocument } from 'src/database/user.schema';
import { orderDetails } from 'src/global/global.interfaces';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async placeOrder(orderDetails: orderDetails[]) {
    try {
      const result = await Promise.all(orderDetails.map(async (orderDetails) => {
        orderDetails.status = "Order Placed";
        const newOrder = new this.orderModel(orderDetails);
        const result = await newOrder.save();
        if (result) {
          const productId = orderDetails.productId;
          const quantity = orderDetails.quantity;
          await this.updateInventoryProductQuantity(quantity, productId);
          return result;
        } else {
          throw {
            message: "Order wasn't placed"
          }
        }
      }))
      return result;
    } catch(error) {
      throw error;
    }
  }

  async updateInventoryProductQuantity(orderQuantity: number, productId: string) {
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

  async updateOrderStatus(updatedStatus: string, orderId: string) {
    try {
      const result = await this.orderModel.updateOne(
        { _id: orderId },
        { status: updatedStatus }
      )
      console.log(result);
      if (result.modifiedCount > 0) {
        return {
          message: "Successfully updated the orders status"
        };
      } else {
        throw {
          message: "Order status wasn't updated, check the orderId"
        }
      }
    } catch(error) {
      console.log(error.message);
      throw error
    }
  }

  async findAll() {
    try {
      const orders = await this.orderModel.find().exec();
      return orders;
    } catch(error) {
      console.log(error.message);
      throw error;
    }
  }

  async getMyOrders(_id: string) {
    try {
      const myOrders = await this.orderModel.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'productDetails'
          }
        },
        {
          $match: {
            userId: _id
          }
        }
      ])
      return myOrders;
    } catch(error) {
      console.log(error.message);
      throw error;
    }
  }

  async executeQuery() {
    try {
      const result = await this.productModel.aggregate([
        {
          $match: {
            quantity: {
              $lte: 6
            }
          }
        },
        {
          $group: {
            _id: "productSummary",
            avgPrice: {$avg: "$price"}
          }
        }
      ])
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}