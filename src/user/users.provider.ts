import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';

export const usersProviders = [
  {
    provide: "USER_MODEL",
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['MONGODB_CONNECTION']
  }
]