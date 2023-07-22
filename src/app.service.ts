import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getGithubUserData(username: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .get(`https://api.github.com/users/${username}`)
      .pipe(
        map((result) => {
          return result.data;
        }),
      );
  }
}
