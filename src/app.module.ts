import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeApiModule } from './node-api/node-api.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NodeApiModule,
    MongooseModule.forRoot(
      'mongodb+srv://msrinfo:kayrossxp@cluster0.sojjznn.mongodb.net/nodeb',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
