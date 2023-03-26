const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const fs = require("fs");
// const { finished } = require("stream");

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());

server.listen(PORT, () =>
  console.log(`The server has started on port: ${PORT}`)
);

server.get("/getGameData", getGameData);
server.get("/getUserProgress", getUserProgress);

function getGameData(request, response) {
  // let data = fs.readFileSync("../userProgress.json");
  // let userProgress = JSON.parse(data);
  // console.log(userProgress);

  let data = fs.readFileSync("../gameData.json");
  let gameData = JSON.parse(data);
  console.log(gameData);

  response.send(gameData);
}

function getUserProgress(request, response) {
  let data = fs.readFileSync("../userProgress.json");
  let userProgress = JSON.parse(data);

  console.log(userProgress);

  response.send(userProgress);
}

server.use(express.json({ limit: "1mb" }));

server.post("/saveUserProgress", (request, response) => {
  console.log("I got a request!");
  console.log(request.body);
  const data = request.body;

  let d = JSON.stringify(data, "", 2);
  fs.writeFile("../userProgress.json", d, finished);
  console.log(d);
  // response.json({
  //   status: "success",
  //   content: "Success! Hello from Server ^^",
  // });
});
function finished(err) {
  console.log(err);
}
