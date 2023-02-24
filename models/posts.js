import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { Users } from "./auth.js";
import { Likes } from "./likes.js";

const DataTypes = SQ.DataTypes;
//const Sequelize = SQ.Sequelize;

export const Posts = sequelize.define(
  "posts",
  {
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true }
);
Posts.belongsTo(Users);
Posts.hasMany(Likes, { as: "l" });

export const INCLUDE_USER = {
  attributes: [
    "postId",
    [sequelize.col("userId"), "userId"],
    [sequelize.col("nickname"), "nickname"],
    "title",
    "createdAt",
    "updatedAt",
  ],
  include: {
    model: Users,
    attributes: [],
  },
};

export const DETAIL_USER = {
  attributes: [
    "postId",
    [sequelize.col("userId"), "userId"],
    [sequelize.col("nickname"), "nickname"],
    "title",
    "content",
    "createdAt",
    "updatedAt",
  ],
  include: {
    model: Users,
    attributes: [],
  },
};

export const ORDER_DESC = {
  order: [["postId", "DESC"]],
};

export const LIKE_COUNT = {
  attributes: [
    "postId",
    [sequelize.col("userId"), "userId"],
    [sequelize.col("nickname"), "nickname"],
    "title",
    "createdAt",
    "updatedAt",
    [sequelize.fn("COUNT", sequelize.col("l.likeId")), "likes"],
  ],
  include: [
    {
      model: Likes,
      as: "l",
      attributes: [],
    },
    {
      model: Users,
      attributes: [],
    },
  ],
};
