const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const app = express();
const env = process.env || "development";

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
const authRouter = require("./routes/auth");
app.use(`${env.API_URL}/`, authRouter);
//Set up default mongoose connection
const hostname = env.HOSTNAME || "localhost";
const port = env.PORT || 3000;
mongoose.connect(
  env.MONGODB_CONNECTION_STRING
).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
}
);
app.listen(3000, "0.0.0.0", () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
