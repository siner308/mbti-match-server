import env from './env';
import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';

export const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: env.db.host,
  port: Number(env.db.port),
  username: env.db.username,
  charset: 'utf8mb4_unicode_ci',
  password: env.db.password,
  database: env.db.name,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
  synchronize: env.app.nodeEnv === 'test',
  dropSchema: env.app.nodeEnv === 'test',
  logging: env.app.nodeEnv !== 'production',
};
