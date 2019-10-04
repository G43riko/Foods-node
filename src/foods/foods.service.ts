import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodsService {
  public getHello(): string {
    return 'Hello Foods!';
  }
}
