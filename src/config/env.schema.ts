import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number()
    .int()
    .min(1)
    .max(65535)
    .default(3000),

  APP_TIMEZONE: z.string()
    .default('Asia/Ho_Chi_Minh'),

  CORS_ORIGIN: z.url(),

  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number()
    .int()
    .min(1)
    .max(65535)
    .default(3306),

  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().default(''),
  DB_NAME: z.string().min(1),

  JWT_SECRET: z.string().min(32),

  JWT_ACCESS_TTL: z.coerce.number()
    .int()
    .positive()
    .default(7200),
})

export type EnvSchema = z.infer<typeof envSchema>
