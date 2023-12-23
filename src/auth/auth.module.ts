import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MyAuthGuard } from './auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { usersProviders } from 'src/user/users.provider';
import { mongoDbProviders } from 'src/database/mongoDb.providers';

@Module({
  imports: [
    JwtModule.register({
      secret: "test_secret",
      signOptions: {
        expiresIn: "1h"
      }
    })
  ],
  controllers: [ AuthController ],
  providers: [
    AuthService,
    MyAuthGuard,
    UserService,
    ...usersProviders,
    ...mongoDbProviders
  ]
})

export class AuthModule {}
