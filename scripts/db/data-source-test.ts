import { DataSourceOptions } from 'typeorm';

export const dbConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'test.sqlite',
  entities: ['**/*.entity.js'],
  logging: false,
  migrations: ['dist/datasource/migrations/*.js'],
};
