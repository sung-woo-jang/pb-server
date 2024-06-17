import { registerAs } from '@nestjs/config';

export const naverConfig = registerAs('naver', () => ({
  clientId: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  redirectUrl: process.env.NAVER_REDIRECT_URI,
  tokenUrl: process.env.NAVER_TOKEN_URL,
  userInfoUrl: process.env.NAVER_USERINFO_URL,
}));

// export const naverConfig = () => ({
//   naver: {
//     clientId: process.env.NAVER_CLIENT_ID,
//     clientSecret: process.env.NAVER_CLIENT_SECRET,
//     redirectUrl: process.env.NAVER_REDIRECT_URI,
//     tokenUrl: process.env.NAVER_TOKEN_URL,
//     userInfoUrl: process.env.NAVER_USERINFO_URL,
//   },
// });
