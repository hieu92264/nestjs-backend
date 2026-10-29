import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  accessTtlSeconds: Number(
    process.env.JWT_ACCESS_TTL ?? 7200,
  ),
}));
