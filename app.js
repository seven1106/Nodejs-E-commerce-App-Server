const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const app = express();
const env = process.env || "development";
app.use(express.json());
// app.use(bodyParser.json());
// app.use(morgan("tiny"));
// app.use(cors());
// app.options("*", cors());
const authRouter = require("./routes/auth");
app.use(`${env.API_URL}`, authRouter);
//Set up default mongoose connection
const HOSTNAME = env.HOSTNAME || "localhost";
const PORT = env.PORT || 3000;
mongoose.connect(
  env.MONGODB_CONNECTION_STRING
).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
}
);
app.get("/", (req, res) => {
  res.send("Hello World");
}
);
app.listen(PORT, "192.168.145.1", () => {
  console.log(`connected at port ${PORT}`);
});