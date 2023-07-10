const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const app = express();

app.get("/", (_req, res) => {
  res.send("Hello there");
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
