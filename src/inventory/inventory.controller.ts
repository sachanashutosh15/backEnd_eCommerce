import { Body, Controller, Post, Get, UseGuards, Put, Param, Res, Delete } from '@nestjs/common';
import globalConstants from 'src/global';
import ResponseHandlers from 'src/utilities/responseHandlers';
import { InventoryService } from './inventory.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('inventory')
export class InventoryController {

  constructor(
    private inventoryService: InventoryService,
  ) {}

  @UseGuards(AuthGuard)
  @Post("addNew")
  async addNewProduct(@Body() productInfo: any) {
    try {
      const name: string = productInfo.name;
      const image: string = productInfo.image;
      const description: string = productInfo.description;
      const weight: number = productInfo.weight; 
      const quantity: number = productInfo.quantity;
      const price: number = productInfo.price;
      if (name && image && description && weight && quantity && price) {
        const productDetails: globalConstants.inventoryItem = {
          name: name,
          image: image,
          description: description,
          weight: weight,
          quantity: quantity,
          price: price
        }
        const result = await this.inventoryService.createNew(productDetails);
        console.log(result);
        return result;
      } else {
        throw {
          message: "Please provide all the necessary information."
        }
      }
    } catch(error) {
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get("getAll")
  async getAllProducts() {
    try {
      const productsList = await this.inventoryService.findAll();
      return ResponseHandlers.sendSuccessResponse(productsList, "Successfully fetched Products list");
    } catch(error) {
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Put("updateOne/:id/quantity/:quantity")
  async updateOneInventoryItemQuantity(@Param() params) {
    try {
      console.log(params);
      const targetDocId = params.id;
      const updatedQuantity = params.quantity;
      if (targetDocId && updatedQuantity) {
        const result = await this.inventoryService.updateOneInventoryItemQuantity(targetDocId, updatedQuantity);
        console.log("updation result", result);
        if (result === 1) {
          return ResponseHandlers.sendSuccessResponse(null, "Succesfully updated the item Quantity.");
        } else {
          return ResponseHandlers.sendErrorResponse("Item with given id couldn't be updated")
        }
      } else {
        throw {
          message: "Please provide the necessary information"
        }
      }
    } catch(error) {
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Delete("deleteOne/:id")
  async deleteOneInventoryItem(@Param() params) {
    try {
      const targetDocId = params.id;
      if (targetDocId) {
        const result = await this.inventoryService.deleteOneInventoryItem(targetDocId);
        if (result.deletedCount === 1) {
          return ResponseHandlers.sendSuccessResponse(null, "Successfully deleted the item from inventory");
        } else {
          return ResponseHandlers.sendErrorResponse("Item wasn't deleted from inventory, check the item id");
        }
      } else {
        throw {
          message: "Please provide the target id."
        }
      }
    } catch(error) {
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }
}
