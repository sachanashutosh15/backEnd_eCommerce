import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { usersProviders } from './users.provider';
import { mongoDbProviders } from 'src/database/mongoDb.providers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    ...usersProviders,
    ...mongoDbProviders
  ]
})
export class UserModule {}
