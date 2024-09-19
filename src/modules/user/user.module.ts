import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '@common/services/auth/auth.service';
import { NaverOAuthService } from '@common/services/auth/naver-oauth.service';
import { UserRepository } from './user.repository';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService, AuthService, NaverOAuthService, UserRepository], // 서비스를 providers에 추가
  exports: [UserService, AuthService, UserRepository], // 다른 모듈에서 User 서비스를 사용할 수 있도록 exports에 추가
})
export class UserModule {}
