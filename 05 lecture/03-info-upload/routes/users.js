import { promises as fs } from "fs";
import express from 'express';
var router = express.Router();

/* GET users listing. */
router.post('/addUserData', async function(req, res, next) {
  console.log(req.body);
  try{
    await fs.writeFile("userData.json", JSON.stringify(req.body));
    res.send('added data');   
  }catch(error){
    res.send("error info:" + error);
  }
});

export default router;
