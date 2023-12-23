import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowUnauthorizedRequest } from './global/functions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowUnauthorizedRequest()
  getHello(): string {
    return this.appService.getHello();
  }
}
