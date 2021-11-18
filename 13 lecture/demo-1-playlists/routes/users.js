import mongoose from "mongoose";
import express from 'express';
var router = express.Router();

main().catch(err => console.log(err));

let User;

async function main() {
  //Run mongo db locally with a command like:
  // Windows: 
  //    mongod.exe --dbpath="c:\code\mongodbData\testdb"
  // Mac: 
  //    brew services start mongodb-community@5.0
  await mongoose.connect('mongodb://localhost:27017/playlists');
  console.log("connected to mongodb");

  //TODO: Add schemas and models
  const userSchema= new mongoose.Schema({
    username: String,
    favorite_bands: [String]
  })
  User = mongoose.model('User', userSchema)
}

// Add a user
router.post('/', async function(req, res, next) {
  let username = req.body.name;
  let newUser = new User({
    username: username,
    favorite_bands: []
  });
  let response = await newUser.save();
  res.json({status: "success"});
});

// get json data for all users
router.get('/', async function(req, res, next) {
  let allUsers = await User.find();
  res.json(allUsers);
});

router.delete('/', async function(req, res, next) {
  let userID = req.body.userID;
  let deletedUserInfo = await User.deleteOne({_id: userID});
  res.json({status: "success"});
});

export default router;
