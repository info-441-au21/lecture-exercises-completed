import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let session=req.session;
  if(session.isAuthenticated){
    //todo: look up info for this username
    res.type("txt");
    res.send(`Here is your information: 
    Name: ${session.account.name}
    username: ${session.account.username}
    `);
  } else {
    res.send('ERROR: you must login to see user information');
  }
});

export default router;
