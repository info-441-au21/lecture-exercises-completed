import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", function(req, res, next) {
  res.send("you tried to login!")
})

export default router;
