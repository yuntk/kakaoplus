var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/keyboard', (req,res,next)=>{
  let obj = {
    "type":"text"
  }
  res.send(obj)
})

module.exports = router;
