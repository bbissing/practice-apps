require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");
const bodyParser = require('body-parser');

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/user', (req, res) => {

  var object = req.body.object;
  console.log('server - /user - get', req.body.object);
  console.log(object.name);
  db.promise().query(`INSERT INTO users (name, email, password) VALUES ( '${object.name}', '${object.email}', '${object.password}' )`)
    .then((results) => { res.send(JSON.stringify(results)); console.log(results[0].insertId); })
    .catch((error) => { console.error(error); });
})

app.post('/location', (req, res) => {

  var object = req.body.object;
  console.log('server - /location - get', req.body.object);
  db.promise().query(`INSERT INTO location (address1, address2, city, state, zip, phone, user_id) VALUES ( '${object.address1}', '${object.address2}', '${object.city}', '${object.state}', '${object.zip}', '${object.phone}', '${object.user_id}')`)
    .then((results) => { console.log(results); })
    .catch((error) => { console.error(error); });
})

app.post('/payment', (req, res) => {

  var object = req.body.object;
  console.log('server - /payment - get', req.body.object);
  db.promise().query(`INSERT INTO paymentInfo (credit_card_number, expiry_date, cvv, zip, user_id) VALUES ( '${object.credit_card_number}', STR_TO_DATE('${object.expiry_date}', '%m/%d/%Y'), '${object.cvv}', '${object.zip}', '${object.user_id}')`)
    .then((results) => { console.log(results); })
    .catch((error) => { console.error(error); });
})

app.get('/summary', (req, res) => {
  var query1 = db.promise().query(`SELECT * FROM users LIMIT 1`);
  var query2 = db.promise().query(`SELECT * FROM location LIMIT 1`);
  var query3 = db.promise().query(`SELECT * FROM paymentInfo LIMIT 1`);

  Promise.all([query1, query2, query3])
    .then((results) => { res.send(JSON.stringify(results)) })
    .catch((error) => { console.error(error) });
})


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
