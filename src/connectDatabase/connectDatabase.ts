import { createConnection, Connection } from 'typeorm';
import * as dotenv from 'dotenv';
import { Comment } from '../comments';
import { Post } from '../posts';

dotenv.config();

const connection = createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT as unknown) as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: [Comment, Post]
});

export { connection };
