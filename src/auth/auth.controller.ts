import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import ResponseHandlers from '../utilities/responseHandlers';
import globalConstants from 'src/global';
import * as bcrypt from "bcrypt";
import { userSignUpInfo } from 'src/global/global.interfaces';
import { AllowUnauthorizedRequest } from 'src/global/functions';


@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Post('signup')
  @AllowUnauthorizedRequest()
  async signUp(@Body() userInfo: globalConstants.userSignUpInfo): Promise<any> {
    try {
      const userDetails: userSignUpInfo = {...userInfo};
      const password = userInfo.password;
      const name = userInfo.name;
      const email = userInfo.email;
      const address = userInfo.address;
      if(password && name && email && address) {
        console.log(email);
        const isUserAlreadyPresent = await this.authService.findOne(email);
        if(!isUserAlreadyPresent) {
          const hashedPassword = await bcrypt.hash(password, 10);
          userDetails.password = hashedPassword;
          const result = await this.authService.createNewUser(userDetails);
          const token = await this.authService.generateToken(userDetails);
          return ResponseHandlers.sendSuccessResponse({
            accessToken: token,
            userInfo: result
          }, "Successfully Created New User");
        } else {
          throw {
            message: "Please choose a different email."
          }
        }
      } else {
        return ResponseHandlers.sendErrorResponse("Please provide all the necessary information.")
      }
    } catch(error) {
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }

  @Post('signin')
  @AllowUnauthorizedRequest()
  async signIn(@Body() userInfo: globalConstants.userLoginInfo) {
    try {
      console.log(userInfo);
      const password = userInfo.password;
      const email = userInfo.email;
      if (email && password) {
        const userDetails: any = await this.authService.findOne(email)
        console.log(userDetails);
        if(!userDetails) {
          throw {
            message: "Please check your emailId"
          }
        }
        const comparisonRes = await bcrypt.compare(password, userDetails.password);
        console.log(comparisonRes);
        if(!comparisonRes) {
          throw {
            message: "Please check your password"
          }
        }
        const tokenPayload = {
          name: userDetails.name,
          email: userDetails.email
        }
        const token = await this.authService.generateToken(tokenPayload);
        return ResponseHandlers.sendSuccessResponse({
          token: token,
          userInfo: userDetails
        }, "Successfully got the details")
      } else {
        return ResponseHandlers.sendErrorResponse("Please provide the necessary information");
      }
    } catch(error) {
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }

  @Get("getUserDetails")
  async getUserDetailsFromToken(@Req() req: any) {
    try {
      console.log(req.user);
      return ResponseHandlers.sendSuccessResponse(req.user, "Successfully fetched user details.");
    } catch(error) {
      return ResponseHandlers.sendErrorResponse(error.message);
    }
  }
}
