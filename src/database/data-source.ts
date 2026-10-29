import { envSchema } from "@/config/env.schema.js";
import { DataSource } from "typeorm";

const env = envSchema.parse(process.env)

const dataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  entities: [],
  migrations: [
    'src/database/migrations/*.ts'
  ]
})
