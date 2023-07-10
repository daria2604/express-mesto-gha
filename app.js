const express = require("express");
const usersRoute = require("./routes/users");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(usersRoute);

mongoose.connect("mongodb://localhost:27017/mestodb");

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
