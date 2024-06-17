import { Module } from '@nestjs/common';
import { SeeService } from './see.service';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [SeeService],
  exports: [SeeService],
})
export class SeeModule {}
