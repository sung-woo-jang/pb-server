import { Module } from '@nestjs/common';
import { NaverApiService } from '@common/services/naver-api/naver-api.service';
import { HttpModule } from '@nestjs/axios';
import { PlaceModule } from '../modules/place/place.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    PlaceModule,
  ],
  providers: [NaverApiService],
  exports: [HttpModule],
})
export class CommonModule {}
