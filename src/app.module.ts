import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from "./user/user.schema";
import { WinstonLogger } from 'src/winston.logger';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://user:cAybJJXce6NULAui@cluster0.q9cvtnj.mongodb.net/'),MongooseModule.forFeature([{name: 'User', schema:UserSchema}])],
  controllers: [AppController],
  providers: [AppService, WinstonLogger]
})
export class AppModule {}
