const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const AuthRouter = require('./Routes/AuthRouter.js')
const ProductRouter = require('./Routes/ProductRouter.js')
require("./Models/db.js");
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.listen(PORT, () => {
  console.log(`sevrer is running on PORT ${PORT}`);
});
//39:33