import { registerAs } from '@nestjs/config';

export const openAIConfig = registerAs('openAI', () => ({
  api_key: process.env.OPENAI_API_KEY,
}));
