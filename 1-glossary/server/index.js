require("dotenv").config();
const express = require('express');
const path = require('path')
const db = require('./db.js');
const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`, path.join(__dirname, '../client/dist'));
});