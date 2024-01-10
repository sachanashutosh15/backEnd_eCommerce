import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.interface';

interface UserDetails {
  name: string,
  email: string,
  password: string,
  address: string
}
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch(error) {
      console.log(error);
      throw "Some error occurred in db"
    }
  }

  async createNew(userDetails: UserDetails): Promise<UserDetails> {
    try {
      const createdUser = new this.userModel(userDetails);
      return await createdUser.save();
    } catch(error) {
      console.log(error);
      throw "Some error occurred"
    }
  }

  async findOneByEmail(email: string): Promise<Partial<UserDetails>> {
    try {
      const info = await this.userModel.findOne({email: email})
      console.log("details from db --->", info);
      if (!info) {
        return null;
      }
      const userDetails = {
        name: info.name,
        email: info.email,
        address: info.address,
        password: info.password
      }
      return userDetails;
    } catch(error) {
      console.error(error)
      throw "Some error occurred"
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
