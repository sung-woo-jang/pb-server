import { ConfigService } from '@nestjs/config';

// 함수 정의
export const jwtModuleOptionsFactory = async (
  configService: ConfigService,
) => ({
  secret: configService.get('JWT_SECRET_KEY'),
  signOptions: {
    expiresIn: `${configService.get('JWT_EXPIRESIN')}s`,
  },
});
