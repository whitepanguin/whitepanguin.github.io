import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import postsRouter from "./router/post.mjs";
import authRouter from "./router/auth.mjs";
import sqlRouter from "./router/sql.mjs";
import { config } from "./config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static("public"));

app.use(express.json());
app.get("/", (req, res) => {
  fs.readFile(__dirname + "/index.html", (err, data) => {
    if (err) {
      res.status(500);
      return res.send("파일 읽기 오류");
    }
    res.status(200).set({ "Content-Type": "text/html" });
    res.send(data);
  });
});

app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/mysql", sqlRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(config.host.port, () => {
  console.log("서버 실행 중");
});
