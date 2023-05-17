import { Body, Controller, Get, Post } from '@nestjs/common';
import { NodeApiService } from './node-api.service';
import { Userdata } from 'src/schemas/userdata.schema';

@Controller('node-api')
export class NodeApiController {
  constructor(private readonly nodeApiService: NodeApiService) {}

  @Get('userdata')
  async getUserData(): Promise<string> {
    return this.nodeApiService.getUserData();
  }

  @Post('userdata')
  async updateMockData(@Body() json: any): Promise<Userdata> {
    const result = await this.nodeApiService.saveData(json);
    return result;
  }
}
