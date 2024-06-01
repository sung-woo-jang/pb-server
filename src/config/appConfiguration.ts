import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const appConfig = {
  envFilePath: `.env.${process.env.MODE}`,
  isGlobal: true,
  validationSchema: Joi.object({
    MODE: Joi.string().valid('local', 'development', 'production').required(),
    PORT: Joi.number().default(8000),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    HOST: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    JWT_EXPIRESIN: Joi.number().required(),
  }),
} as ConfigModuleOptions;
