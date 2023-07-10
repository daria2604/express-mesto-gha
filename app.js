const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();

app.get("/", (_req, res) => {
  res.send('Hello there');
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
