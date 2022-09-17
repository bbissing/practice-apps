require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db.js');
const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/glossary', (req, res) => {
  var term = req.body.object;
  db.Word.find({ word: term.word })
    .then(doc => {
      if(doc.length) {
        throw 'Document has already been added!';
      } else {
        var newWord = new db.Word({ word: term.word, definition: term.definition });
        newWord.save()
          .then(doc => { res.send(JSON.stringify(doc)); })
          .catch(error => { console.error(error); });
      }
    })
    .catch(error => { console.error(error); });
});

app.get('/glossary', (req, res) => {
  console.log('server - index.js - app.get()');
  db.Word.find({})
    .then(docs => { res.send(JSON.stringify(docs)); })
    .catch(error => { console.error('get - error'); });
  console.log('terms extracted from database');

});

app.post('/update', (req, res) => {
  var filter = req.body.filter;
  var update = req.body.update;
  console.log('server - index.js - update - app.post()', filter, update);
  db.Word.findOneAndUpdate(filter, update, {new: true})
    .then(newDoc => { res.send(JSON.stringify(newDoc)); })
    .catch(error => { console.error(error); });
});

app.post('/delete', (req, res) => {
  var term = req.body.object;
  console.log('server - index.js - delete - app.post()', term);
  db.Word.deleteOne(term)
    .then(deletedCount => { res.send(JSON.stringify(deletedCount)); })
    .catch(error => { console.error(error); });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});



// Promise.all(req.body.object.map(term => {
//   console.log('new term added to database');
//   var newWord = new db.Word({ word: term.word, definition: term.definition });
//   return newWord.save()
//     .then(doc => { return doc })
//     .catch(error => { console.log('term error'); });
// }))
//   .then(data => { res.send('success'); })
//   .catch(error => { console.error('error') });