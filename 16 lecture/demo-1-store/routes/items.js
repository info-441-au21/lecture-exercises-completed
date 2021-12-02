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


// get json data for all items
router.get('/', async function(req, res, next) {
  let allItems = await Item.find();
  res.json(allItems);
});

router.post('/saveCart', async function(req, res, next) {
  let cartInfo = req.body;
  console.log("saving cart info: " + cartInfo);
  req.session.cartInfo = JSON.stringify(cartInfo);
  console.log("saved cart info" + req.session.cartInfo);
  res.json({status: "success"})
})


router.get('/getCart', async function(req, res, next) {
  //if the user has no cart, return []
  if(!req.session.cartInfo){
    res.json([])
    return
  }

  // get from session the itemIds and the itemCounts
  let cartInfo = JSON.parse(req.session.cartInfo);
  let cartItemIds = cartInfo.map(cartItem => cartItem.itemId);

  // get from mongodb the item names and prices (with itemIds)
  let itemsInfo = await Item.find().where('_id').in(cartItemIds).exec();
  
  // combine those together

  // make itemsInfo lookup-able by Id
  let itemsInfoById = {}
  itemsInfo.forEach(itemInfo => {
    itemsInfoById[itemInfo._id] = itemInfo;
  })
  // add price and name to the cartInfo by looking up te itemsInfo by Id
  let combinedCartInfo = cartInfo.map(cartItem => {
    cartItem["price"] = itemsInfoById[cartItem.itemId].price
    cartItem["name"] = itemsInfoById[cartItem.itemId].name
    return cartItem
  })

  // return that json
  res.json(combinedCartInfo)
})



export default router;
