import { Module } from '@nestjs/common';
import { NodeApiController } from './node-api.controller';
import { NodeApiService } from './node-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Userdata, UserdataSchema } from 'src/schemas/userdata.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Userdata.name, schema: UserdataSchema },
    ]),
  ],
  controllers: [NodeApiController],
  providers: [NodeApiService],
})
export class NodeApiModule {}
