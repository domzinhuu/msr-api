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

  getGithubUserData(username: string): Observable<any> {
    return this.httpService
      .get(`https://api.github.com/users/${username}`)
      .pipe(
        map((result) => {
          return {
            userName: result.data.login,
            avatar: result.data.avatar_url,
            name: result.data.name,
            location: result.data.location,
            bio: result.data.bio,
          };
        }),
      );
  }
}
