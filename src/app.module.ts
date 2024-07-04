import { Module } from '@nestjs/common';
import { SeeModule } from './see/see.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, SeeModule, UserModule, PostModule],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: ClassSerializerInterceptor,
  //   },
  // ],
})
export class AppModule {}
