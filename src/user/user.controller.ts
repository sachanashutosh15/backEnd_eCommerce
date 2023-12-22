import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import ResponseHandlers from 'src/utilities/responseHandlers';
import { User } from 'src/database/user.schema';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get("getall")
  async getAllUsers() {
    try {
      const allUsers = await this.userService.findAll();
      return ResponseHandlers.sendSuccessResponse(allUsers, "Successfully fetched all users");
    } catch (error) {
      return ResponseHandlers.sendErrorResponse(error.message)
    }
  }
}
