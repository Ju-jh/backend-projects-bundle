import dotenv from "dotenv";
import SQ from "sequelize";
dotenv.config();

//env 담아오기
const user = process.env.DB_USER;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;

//sequlize
export const sequelize = new SQ.Sequelize(database, user, password, {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: true,
});
