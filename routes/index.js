var express = require('express');
var router = express.Router();

/* kakao plus friend main menu */
router.get('/keyboard', (req,res,next)=>{
  let obj = {
    "type":"text"
  }
  res.send(obj)
})

/**
   * If kakao user sended message in plus friend menu,
   * kakao server post request to {app address registerd by me}/message
   * The req.body Data is JSON format like below
   * {
   *   "user_key": "encryptedUserKey",
   *   "type": "text",
   *   "content": "Sended message"
   * }
   * or
   * {
   *    "user_key": "encryptedUserKey",
   *    "type": "photo",
   *    "content": "http://photo_url/number.jpg"
   * }
   */
router.post('/massage', (req,res,next)=>{
  let obj = {
    "message":{
        "text" : req.body.content
   }
  }
  res.send(obj)
})

module.exports = router;
