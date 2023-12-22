import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class MyAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {
    this.canActivate = this.canActivate.bind(this)
  }

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const allowUnauthorizedRequest = this.reflector.get<boolean>('allowUnauthorizedRequest', context.getHandler())
    if (allowUnauthorizedRequest) {
      return true;
    } 
    if(!token) {
      throw new UnauthorizedException();
    }
    try {
      const decodedPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: `${process.env.SECRET_KEY}`
        }
      )
      request.user = decodedPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}