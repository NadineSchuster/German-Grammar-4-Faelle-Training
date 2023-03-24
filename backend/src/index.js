const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());

server.listen(PORT, () =>
  console.log(`The server has started on port: ${PORT}`)
);

server.use(express.json({ limit: "1mb" }));

server.post("/api", (request, resoponse) => {
  console.log("I got a request!");
  console.log(request.body);
});
