import { promises as fs } from "fs";
import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/getPterosaurs', async function(req, res, next) {
  try {
    const data = await fs.readFile("data/pterosaur.json");
    const dataString = data.toString();
    let pterosaurInfo = JSON.parse(dataString);
    let filteredPterosaurInfo = pterosaurInfo.filter(onePterosaur => {
        if(onePterosaur.img && onePterosaur.img != ""){
            return true;
        }
        return false;
    })

    res.json(filteredPterosaurInfo);
  } catch(error) {
      console.log("There was an error:" + error);
      res.send("There was an error");
  }
});

export default router;
