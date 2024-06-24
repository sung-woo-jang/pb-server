import * as Joi from 'joi';

const defaultConfigSchema = {
  MODE: Joi.string().valid('local', 'development', 'production').required(),
  PORT: Joi.number().default(8000),
};

const postgresConfigSchema = {
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_DB_PORT: Joi.number().default(5432).required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_SESSION_SECRET: Joi.string().required(),
  POSTGRES_SESSION_NAME: Joi.string().required(),

  // MODE 값이 있다면 자동등록되어 검사제외
  // synchronize: Joi.boolean().required(),
  // logging: Joi.boolean().required(),
};

const naverConfigSchema = {
  NAVER_CLIENT_ID: Joi.string().required(),
  NAVER_CLIENT_SECRET: Joi.string().required(),
  NAVER_REDIRECT_URL: Joi.string().required(),
  NAVER_TOKEN_URL: Joi.string().required(),
  NAVER_USERINFO_URL: Joi.string().required(),
};

export const validationSchema = Joi.object({ ...defaultConfigSchema, ...postgresConfigSchema, ...naverConfigSchema });

// export const defaultConfigSchema = Joi.object({
//   mode: Joi.string().valid('local', 'development', 'production').required(),
//   port: Joi.number().default(8000),
//   test: Joi.number().required(),
// });

// export const postgresConfigSchema = Joi.object({
//   postgresMain: Joi.object({
//     host: Joi.string().required(),
//     port: Joi.number().default(5432).required(),
//     username: Joi.string().required(),
//     password: Joi.string().required(),
//     database: Joi.string().required(),
//     synchronize: Joi.boolean().required(),
//     logging: Joi.boolean().required(),
//   }).required(),
// });

// export const naverConfigSchema = Joi.object({
//   naver: Joi.object({
//     clientId: Joi.string().required(),
//     clientSecret: Joi.string().required(),
//     redirectUrl: Joi.string().required(),
//     tokenUrl: Joi.string().required(),
//     userInfoUrl: Joi.string().required(),
//   }),
// });
