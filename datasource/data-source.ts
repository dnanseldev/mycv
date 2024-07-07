import { DataSourceOptions } from 'typeorm';

interface DbCon {
  type: string;
  database: string;
  entities: string[];
}

let tmp: DbCon;

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(tmp, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(tmp, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('Unknown environment');
}
const { type, database, entities } = tmp;
export const dbConfig: DataSourceOptions = {
  type: tmp.type || 'sqlite',
  database,
  entities,
  logging: false,
  migrations: ['dist/datasource/migrations/*.js'],
};
