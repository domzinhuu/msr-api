import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/git/:username')
  async getGithubUserData(@Param() { username }): Promise<any> {
    return this.appService.getGithubUserData(username);
  }
}
