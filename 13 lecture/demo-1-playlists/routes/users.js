import mongoose from "mongoose";
import express from 'express';
var router = express.Router();

main().catch(err => console.log(err));

let User;

async function main() {
  //Run mongo db locally with a command like:
  // mongod.exe --dbpath="c:\code\mongodbData\testdb"
  await mongoose.connect('mongodb://localhost:27017/info_upload');

  //TODO: Add schemas and models
}

// Add a user
router.post('/', async function(req, res, next) {
  res.json({});
});

// get json data for all users
router.get('/', async function(req, res, next) {
  res.json({});
});

export default router;
