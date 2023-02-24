import dotenv from 'dotenv';
import SQ from 'sequelize';
dotenv.config();

//env 담아오기
const user = process.env.DB_USER;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;

//sequlize
export const sequelize = new SQ.Sequelize(database, user, password, {
  host: '172.18.0.2',
  dialect: 'mysql',
  logging: true,
});
