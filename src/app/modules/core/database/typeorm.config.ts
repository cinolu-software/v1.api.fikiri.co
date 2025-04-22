import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as process from 'node:process';

config({
  path: '.env'
});

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: ['dist/src/app/modules/core/database/migrations/**'],
  entities: ['dist/**/*.entity.js']
});

dataSource.initialize().catch((error) => console.log(error));
