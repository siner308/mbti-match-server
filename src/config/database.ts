import env from './env';
import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { User } from '../entities/User';
import { Group } from '../entities/Group';
import { Match } from '../entities/Match';

const baseDir: string = __dirname.split(env.rootDir)[1].split('/')[1];
const migrationBaseDir: string = baseDir === 'src' ? 'src' : 'dist/src';
const ext: string = baseDir === 'src' ? 'ts' : 'js';

export const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: env.db.host,
  port: Number(env.db.port),
  username: env.db.username,
  charset: 'utf8mb4_unicode_ci',
  password: env.db.password,
  database: env.db.name,
  entities: [User, Group, Match],
  migrations: [migrationBaseDir + '/migrations/*.' + ext],
  subscribers: [migrationBaseDir + '/subscribers/*.' + ext],
  cli: {
    entitiesDir: baseDir + '/entities',
    migrationsDir: baseDir + '/migrations',
    subscribersDir: baseDir + '/subscribers',
  },
  synchronize: env.app.nodeEnv === 'test',
  dropSchema: env.app.nodeEnv === 'test',
  logging: env.app.nodeEnv !== 'production',
};
