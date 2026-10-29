import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function typeormOptions(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: "mysql",
    host: config.getOrThrow<string>('database.host'),
    port: config.getOrThrow<number>('database.port'),

    username: config.getOrThrow<string>('database.username'),
    password: config.getOrThrow<string>('database.password'),
    database: config.getOrThrow<string>('database.name'),
    entities: [

    ],
    synchronize: false,
    migrationsRun: false,

    logging: config.getOrThrow<string>('app.nodeEnv') === 'development',

    charset: 'utf8mb4',
  }
}
