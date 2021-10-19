import sqlite3 from 'sqlite3';
const sqlite3v = sqlite3.verbose();
import express from 'express';
var router = express.Router();


//initialize db:
let db = new sqlite3v.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


//initialize the tables
db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run('CREATE TABLE secret_table(message text)')
    .run(`INSERT INTO secret_table(message)
          VALUES('The password for Kyle is: "pa55w0rd"'),
          ('The treasure is hidden on the 5th floor'),
          ('Operation Treadstone has been shut down')`)


    .run('CREATE TABLE people(first_name text, last_name text)')
    .run(`INSERT INTO people(first_name, last_name)
          VALUES("Kyle", "Thayer"),
                ("Kyle", "Chandler"),
                ("Jaimie", "Jin"),
                ("Lyons", "Lu")`)
});


router.get('/person', function(req, res, next) {
  let nameSearch = req.query.nameSearch ? req.query.nameSearch : ""
  db.all(`SELECT * FROM people WHERE first_name = "${nameSearch}"`, (err, allRows) => {
    if (err){
      console.log("db error: " + err)
      res.send("db error: " + err);
    }
    if(!allRows){
      return "";
    }
    let matchingPeople = allRows.map(row => `${row.first_name} ${row.last_name}`).join("\n");
    res.send(matchingPeople);
  });
});


export default router;
