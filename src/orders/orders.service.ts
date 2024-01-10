import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
// import { Repository } from 'typeorm';
// import { SqlOrder } from './order.entity';
import { InventoryService } from 'src/inventory/inventory.service';
import { Order, OrderDetails_int } from './order.interface';
import { ObjectId } from 'src/database/mongoDb.providers';


@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<Order>,
    private inventoryService: InventoryService
    // @Inject('ORDER_REPOSITORY')
    // private orderRepository: Repository<SqlOrder>
  ) {}

  async placeOrder(orderDetails: OrderDetails_int[]) {
    try {
      const result = await Promise.all(orderDetails.map(async (orderDetails) => {
        orderDetails.status = "Order Placed";
        const newOrder = new this.orderModel(orderDetails);
        const result = await newOrder.save();
        if (result) {
          const productId = orderDetails.productId;
          const quantity = orderDetails.quantity;
          await this.inventoryService.updateProductQuantity(quantity, productId);
          // const newOrder = new SqlOrder();
          // newOrder.userId = 1;
          // newOrder.productId = 1;
          // newOrder.status = "pending";
          // newOrder.quantity = 1;
          // await this.orderRepository.save(newOrder);
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

  async updateOrderStatus(updatedStatus: string, orderId: ObjectId) {
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

  async getMyOrders(_id: mongoose.Schema.Types.ObjectId) {
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
      const result = await this.orderModel.aggregate([
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