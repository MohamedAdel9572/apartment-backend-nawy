import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Apartment } from '../model/Apartment';
import { User } from '../model/User';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Creates the table automatically (not for production!)
  entities: [Apartment, User],
  options: {
    encrypt: false, // Required for local SQL Server without SSL
  },
});
