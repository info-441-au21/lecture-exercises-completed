import { promises as fs } from "fs";
import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/getPterosaurs', async function(req, res, next) {
  const data = await fs.readFile("data/pterosaur.json");
  const dataString = data.toString();
  res.send(dataString);
});

export default router;
