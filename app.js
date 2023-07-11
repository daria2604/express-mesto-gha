const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64ad2c9edd9dae7fa12d753b', // _id тестового пользователя
  };

  next();
});
app.use(bodyParser.json());
app.use('/users', users);
app.use('/cards', cards);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
