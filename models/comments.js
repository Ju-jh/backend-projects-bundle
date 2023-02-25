import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { Users } from "./auth.js";
const DataTypes = SQ.DataTypes;

export const Comments = sequelize.define(
  "comments",
  {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true }
);
Comments.belongsTo(Users);

export const INCLUDE_USER = {
  attributes: [
    "commentId",
    [sequelize.col("userId"), "userId"],
    [sequelize.col("nickname"), "nickname"],
    "comment",
    "createdAt",
    "updatedAt",
  ],
  include: {
    model: Users,
    attributes: [],
  },
};

export const ORDER_DESC = {
  order: [["commentId", "DESC"]],
};
