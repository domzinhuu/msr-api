import { Controller, Get } from '@nestjs/common';
import { NodeApiService } from './node-api.service';

@Controller('node-api')
export class NodeApiController {
  constructor(private readonly nodeApiService: NodeApiService) {}

  @Get('userdata')
  async getUserData(): Promise<string> {
    return this.nodeApiService.getUserData();
  }
}
