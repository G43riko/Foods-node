import { Module } from '@nestjs/common';

@Module({
  exports: [SharedServicesModule],
})
export class SharedServicesModule {}
