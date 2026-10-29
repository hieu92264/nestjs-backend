import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  timezone: process.env.APP_TIMEZONE ?? 'Asia/Ho_Chi_Minh',
  corsOrigin: process.env.CORS_ORIGIN,
}))
