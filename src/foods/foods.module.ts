import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { PageCreatorService } from '../shared/services/page-creator.service';
import { SharedServicesModule } from '../shared/services/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [FoodsController],
  providers: [FoodsService, PageCreatorService],
})
export class FoodsModule {}
