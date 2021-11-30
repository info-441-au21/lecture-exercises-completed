import cache from 'memory-cache';
import mongoose from "mongoose";
import express from 'express';
var router = express.Router();

main().catch(err => console.log(err));

let Item;

async function main() {
  //Run mongo db locally with a command like:
  // Windows: 
  //    mongod.exe --dbpath="c:\code\mongodbData\testdb"
  // Mac: 
  //    brew services start mongodb-community@5.0
  await mongoose.connect('mongodb://localhost:27017/store');
  console.log("connected to mongodb");

  //TODO: Add schemas and models
  const itemSchema = new mongoose.Schema({
    name: String,
    price: Number
  })
  Item = mongoose.model('Item', itemSchema);
}

async function getItemsSlow(){
  let allItems = await Item.find();
  let sleepSeconds = 5;
  await new Promise(r => setTimeout(r, sleepSeconds*1000));
  return allItems;
}


// get json data for all items
router.get('/', async function(req, res, next) {
  // first try the cache
  let allItems = cache.get("allItems")
  if(allItems){
    console.log("Found items in the cache!")
  } else {
    console.log("Cache miss, doing db lookup again")
    allItems = await getItemsSlow();
    cache.put("allItems", allItems, 30*1000)
  }

  console.log("returning allItems now")
  res.set('Cache-Control', 'public, max-age=30')
  res.json(allItems);
});

export default router;
