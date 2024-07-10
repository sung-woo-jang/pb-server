import { registerAs } from '@nestjs/config';

export const postgresConfig = registerAs('postgresMain', () => ({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_DB_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.MODE !== 'production', // 개발 환경에서는 true, 프로덕션 환경에서는 false로 설정
  logging: process.env.MODE !== 'production',
}));

// export const postgresConfig = () => ({
//   postgresMain: {
//     host: process.env.POSTGRES_MAIN_HOST,
//     port: parseInt(process.env.POSTGRES_MAIN_DB_PORT, 10),
//     username: process.env.POSTGRES_MAIN_USER,
//     password: process.env.POSTGRES_MAIN_PASSWORD,
//     database: process.env.POSTGRES_MAIN_DB,
//     synchronize: process.env.MODE !== 'production' ? true : false, // 개발 환경에서는 true, 프로덕션 환경에서는 false로 설정
//     logging: process.env.MODE !== 'production' ? true : false,
//   },
// });
