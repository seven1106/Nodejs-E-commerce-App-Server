const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const app = express();
const env = process.env || "development";

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

const hostname = env.HOSTNAME || "localhost";
const port = env.PORT || 3000;
mongoose.connect(
  env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/test"
).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
}
);
app.listen(3000, "0.0.0.0", () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
