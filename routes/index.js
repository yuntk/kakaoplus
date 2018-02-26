var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : 'localhost',
  user            : 'root',
  password        : 'qkqh7083',
  database        : 'kakaoapi'
});

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
router.post('/message', (req,res,next)=>{
  var userkey = req.body.user_key;
  var upurl = req.body.content;
  var downurl = "http://13.124.76.13:3001/"+userkey+"out.jpg"
  var sql = "insert into imagelist(userkey,upurl,downurl) values(?,?,?)";
  var arr = [userkey,upurl,downurl]
  if(req.body.type=="photo"){
    pool.getConnection((err, conn) => {
      if(err) { console.log(err); return; }
      conn.query(sql, arr, (err, result)=>{
        conn.release();
        if(err) { console.log(err); return; }
        let obj = {
          "message":{
              "text" : downurl
          }
        }
        res.send(obj)   
      });
    });  
  }else{
    let obj = {
      "message":{
          "text" : "사진을 올려주세요."
      }
    }
    res.send(obj)
  }
});

module.exports = router;
