import { Controller, Get } from '@nestjs/common';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  public getList(): string {
    return this.foodsService.getHello();
  }
}
