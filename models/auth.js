import SQ from "sequelize";
import { sequelize } from "../db/database.js";

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  "users",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  { timestamps: false }
);
