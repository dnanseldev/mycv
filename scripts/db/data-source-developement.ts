import { DataSource, DataSourceOptions } from 'typeorm';

export const dbConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/**/*.entity.js'],
  logging: false,
  migrations: ['dist/migrations/*.js'],
  //synchronize: true,
};

export const datasource = new DataSource(dbConfig);
