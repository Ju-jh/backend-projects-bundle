import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";
const DataTypes = SQ.DataTypes;

export const Likes = sequelize.define(
  "likes",
  {
    likeId: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);
Likes.belongsTo(User);
