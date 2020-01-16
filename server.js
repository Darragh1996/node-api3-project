const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.post("/", (req, res) => {
  res.send("hello");
});

//custom middleware

function logger(req, res, next) {
  console.log(`METHOD: ${req.method} URL: ${req.url} ${new Date()}`);
  next();
}

module.exports = server;
