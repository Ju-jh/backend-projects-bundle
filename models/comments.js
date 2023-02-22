import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

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
Comments.belongsTo(User);

export const INCLUDE_USER = {
  attributes: [
    "commentId",
    [Sequelize.col("User.userId"), "userId"],
    [Sequelize.col("User.nickname"), "nickname"],
    "comment",
    "createdAt",
    "updatedAt",
  ],
  include: {
    model: User,
    attributes: [],
  },
};

export const ORDER_DESC = {
  order: [["commentId", "DESC"]],
};
