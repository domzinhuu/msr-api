import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeApiModule } from './node-api/node-api.module';

@Module({
  imports: [NodeApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
