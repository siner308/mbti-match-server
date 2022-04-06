import * as dotenv from 'dotenv';
import fs from 'fs';
import { DotenvParseOutput } from 'dotenv';

const envPath: string = `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`;
const parsed: DotenvParseOutput = dotenv.parse(fs.readFileSync(envPath));

interface DatabaseEnv {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

interface AWSEnv {
  s3Bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

interface AppEnv {
  cookieSecret: string;
  port: number;
  sentryDSN: string;
  nodeEnv: string;
}

interface Env {
  rootDir: string;
  db: DatabaseEnv;
  aws: AWSEnv;
  app: AppEnv;
}

const env: Env = {
  rootDir: process.cwd(),
  db: {
    host: parsed.DB_HOST.toString(),
    port: Number(parsed.DB_PORT),
    username: parsed.DB_USERNAME.toString(),
    password: parsed.DB_PASSWORD.toString(),
    name: parsed.DB_NAME.toString(),
  },
  aws: {
    s3Bucket: parsed.AWS_S3_BUCKET.toString(),
    accessKeyId: parsed.AWS_ACCESS_KEY_ID.toString(),
    secretAccessKey: parsed.AWS_SECRET_ACCESS_KEY.toString(),
    region: parsed.AWS_REGION.toString(),
  },
  app: {
    cookieSecret: parsed.COOKIE_SECRET.toString(),
    port: Number(parsed.PORT),
    sentryDSN: parsed.SENTRY_DSN.toString(),
    nodeEnv: parsed.NODE_ENV.toString(),
  },
};

export default env;
