import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import dotenv, { DotenvParseOutput } from 'dotenv';
import fs from 'fs';

const envPath: string = `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`;
const parsed: DotenvParseOutput = dotenv.parse(fs.readFileSync(envPath));

const ormconfig: ConnectionOptions = {
  type: 'mysql',
  host: parsed.DB_HOST,
  port: Number(parsed.DB_PORT),
  username: parsed.DB_USERNAME,
  password: parsed.DB_PASSWORD,
  database: parsed.DB_NAME,
  synchronize: false,
  entities: [ 'src/entities/**/*.ts' ],
  migrations: [ 'src/migrations/**/*.ts' ],
  subscribers: [ 'src/subscribers/**/*.ts' ],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};

export default ormconfig;
