import { Controller, Post, Body, Put, Param, Get, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import ResponseHandlers from 'src/utilities/responseHandlers';
import globalConstants from 'src/global';
import { UserService } from 'src/user/user.service';

@Controller('orders')
export class OrdersController {
  
  constructor(
    private ordersService: OrdersService,
    private userService: UserService
  ) {}

  @Post("createNew")
  async createNewOrder(@Req() req, @Body() orderInfo: any) {
    try {
      console.log(orderInfo);
      console.log(req.user);
      const email = req.user.email;
      const { _id } = await this.userService.getUserDocIdFromEmail(email);
      if (!_id) {
        throw {
          message: "Something is very wrong."
        }
      }
      const orders = orderInfo.map((order: any) => {
        const userId = _id;
        const productId = order.productId;
        const quantity = order.quantity;
        const status = "In process";
        if (userId && productId && quantity) {
          const newOrderDetails: globalConstants.orderDetails = {
            userId: userId,
            productId: productId,
            quantity: quantity,
            status: status
          }
          return newOrderDetails;
        } else {
          throw {
            message: "Order can't be placed, payload is not valid"
          }
        }
      })
      const result = await this.ordersService.placeOrder(orders);
      return ResponseHandlers.sendSuccessResponse(result, "Successfully placed the order");
    } catch(error) {
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }

  @Put("updateOrderStatus/:orderId/updatedStatus/:status")
  async updateOrderStatus(@Param() params) {
    try {
      const orderId = params.orderId;
      const status = params.status;
      if (orderId && status) {
        const result = await this.ordersService.updateOrderStatus(status, orderId);
        return ResponseHandlers.sendSuccessResponse(result, "Successfully updated the order status")
      } else {
        throw {
          message: "Please provide necessary information."
        }
      }
    } catch(error) {
      console.log(error.message);
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }

  @Get("getMyOrders")
  async getMyOrders(@Req() req: any) {
    try {
      const email = req.user.email;
      const { _id } = await this.userService.getUserDocIdFromEmail(email);
      if (!_id) {
        throw {
          message: "Something is very wrong."
        }
      }
      const myOrders = await this.ordersService.getMyOrders(_id);
      console.log(myOrders);
      return ResponseHandlers.sendSuccessResponse(myOrders, "Successfully fetched requested orders list");
    } catch(error) {
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }

  @Get("getAll")
  async getAll() {
    try {
      const ordersList = await this.ordersService.findAll();
      return ResponseHandlers.sendSuccessResponse(ordersList, "Successfully fetched all orders.");
    } catch(error) {
      console.log(error.message);
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }
}