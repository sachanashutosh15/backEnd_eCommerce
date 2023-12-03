import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/user.schema';
import globalConstants from 'src/global';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
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

  async createNewUser(user: User) {
    try {
      const newUser = new this.userModel(user);
      const result = await newUser.save();
      return result;
    } catch(error) {
      console.log(error);
      throw "Some error occurred in db"
    }
  }

  async findOne(email: string) {
    try {
      const info = await this.userModel.findOne({ email: email })
      if (!info) {
        return null;
      }
      const userDetails: globalConstants.userSignUpInfo = {
        name: info.name,
        email: info.email,
        address: info.address,
        password: info.password
      }
      return userDetails;
    } catch(error) {
      throw error.message;
    }
  }
}
