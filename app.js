import express from "express";
import postRoute from "./routes/posts.js";
import authRoute from "./routes/auth.js";
import commentRoute from "./routes/comments.js";
import likeRoute from "./routes/likes.js";
import { sequelize } from "./db/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

const connection = process.env;

app.use("/", likeRoute);
app.use("/", authRoute);
app.use("/posts", postRoute);
app.use("/posts/:postId", commentRoute);

sequelize.sync().then(() => {
  console.log(`Server connecting on mysql`);
});

app.listen(connection.HOST_PORT, () =>
  console.log(`Server listening on port ${connection.HOST_PORT}`)
);
