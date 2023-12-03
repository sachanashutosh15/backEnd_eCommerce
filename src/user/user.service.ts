import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/database/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch(error) {
      console.log(error);
      throw "Some error occurred in db"
    }
  }

  async getUserDocIdFromEmail(email: string) {
    try {
      const userDetails: any = await this.userModel.findOne({ email: email });
      console.log(userDetails);
      return {
        _id: userDetails._id
      }
    } catch(error) {
      console.log(error.message);
      return {
        error: error.message
      }
    }
  }
}
