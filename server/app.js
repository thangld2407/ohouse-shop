require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const router = require("./router");
const bodyParser = require("body-parser");

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "API IS WORKING",
    statusCode: 200,
  });
});
app.use("/api/v1/", router);
app.use("*", (req, res) => {
  res.status(404).json({
    message: false,
    errors: [
      {
        msg: "Route not found",
      },
    ],
  });
});

// Collecting database , host
const PORT = process.env.PORT || 3000;
const { connectToDB } = require("./database/database_connect");
connectToDB().then((_) => {
  app.listen(PORT, (_) => {
    console.log(`Server started on port ${PORT}`);
  });
});
