import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async generateToken(userInfo: any) {
    try {
      const payload: any = {
        username: userInfo.name,
        email: userInfo.email
      };
      const token = this.jwtService.sign(payload, {
        secret: `${process.env.SECRET_KEY}`
      })
      return token;
    } catch(error) {
      console.log(error);
      throw error.message;
    }
  }
}
