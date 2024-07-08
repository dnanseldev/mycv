import { DataSourceOptions } from 'typeorm';

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  database: 'yufix',
  entities: ['**/*.entity.js'],
  logging: false,
  migrations: ['dist/datasource/migrations/*.js'],
};
