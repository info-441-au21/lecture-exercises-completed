import { promises as fs } from "fs";
import mongoose from "mongoose";
import express from 'express';
var router = express.Router();

main().catch(err => console.log(err));

let User;

async function main() {
  await mongoose.connect('mongodb://localhost:27017/info_upload');

  const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    favorite_ice_cream: String
  });

  User = mongoose.model('User', userSchema);
}

/* GET users listing. */
router.post('/addUserData', async function(req, res, next) {
  console.log(req.body);
  try{
    const newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      favorite_ice_cream: req.body.favorite_ice_cream
    });

    await newUser.save();
    res.send('added data');   
  }catch(error){
    res.send("error info:" + error);
  }
});

router.get('/getUsers', async function(req, res, next) {
  let allUsers = await User.find();

  let html = allUsers.map(userInfo => {
    return `User info: 
    ${userInfo.first_name} 
    ${userInfo.last_name}
    ${userInfo.favorite_ice_cream}
    `
  }).join("<br>")

  res.type("html")
  res.send(html);

})

export default router;
