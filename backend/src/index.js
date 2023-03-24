const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();

const server = express();
server.use(cors());

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`The server has started on port: ${PORT}`)
);

server.post("/api", (request, resoponse) => {
  console.log(request);
});
