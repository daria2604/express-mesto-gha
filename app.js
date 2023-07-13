const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { NOT_FOUND } = require('./errors/status');
const { pageNotFoundErrorMessage } = require('./errors/messages');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64afa14c95752bd9c0ca27a0', // _id тестового пользователя
  };

  next();
});
app.use(bodyParser.json());
app.use('/users', users);
app.use('/cards', cards);
app.patch('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: pageNotFoundErrorMessage });
});

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
