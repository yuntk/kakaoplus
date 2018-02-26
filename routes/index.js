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
    "message":{
      "text" : "아래 버튼에서 원하는 스타일을 선택해주세요"
    },
    "keyboard" : {
      "type" : "buttons",
      "buttons" : [
        "그림 보기",
        "1.Rain Princesss, by Leonid Afremov",
        "2.La Muse, by Pablo Picasso",
        "3.Udnie by Francis Picabia",
        "4.Scream, by Edvard Munch",
        "5.The Great Wave off Kanagawa, by Hokusai",
        "6.The Shipwreck of the Minotaur, by J.M.W. Turner"
      ]
    }
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
  console.log(req.body)
  var userkey = req.body.user_key;
  var upurl = req.body.content;
  var downurl = "http://13.124.76.13:3001/images/"+userkey+"out.jpg"
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
              "text" : "사진 변환에는 30초정도 걸립니다. 잠시후에 아래 링크를 클릭해주세요. \n"+downurl,
          }
        }
        res.send(obj)   
      });
    });  
  }else{
    msg = req.body.content;
    if(msg == "그림 보기"){
      var obj = {
        "message":{
          "text" : "위에서부터 1번 그림입니다.",
          "photo": {
            "url": "http://13.124.76.13:3001/images/paint.png",
            "width": 640,
            "height": 2800
          }
        },
        "keyboard" : {
          "type" : "buttons",
          "buttons" : [
            "그림 보기",
            "1.Rain Princesss, by Leonid Afremov",
            "2.La Muse, by Pablo Picasso",
            "3.Udnie by Francis Picabia",
            "4.Scream, by Edvard Munch",
            "5.The Great Wave off Kanagawa, by Hokusai",
            "6.The Shipwreck of the Minotaur, by J.M.W. Turner"
          ]
        }
      }
      res.send(obj)
    }else if(msg == "1.Rain Princesss, by Leonid Afremov"
      || msg == "2.La Muse, by Pablo Picasso"
      || msg == "3.Udnie by Francis Picabia"
      || msg == "4.Scream, by Edvard Munch"
      || msg == "5.The Great Wave off Kanagawa, by Hokusai"
      || msg == "6.The Shipwreck of the Minotaur, by J.M.W. Turner"){
      var obj = {
        "message":{
            "text" : "사진을 올려주세요. 다른 스타일을 원하면 아무 메세지나 입력하세요."
        }
      }
      res.send(obj)
    }else{
      let obj = {
        "message":{
          "text" : "아래 버튼에서 원하는 스타일을 선택해주세요"
        },
        "keyboard" : {
          "type" : "buttons",
          "buttons" : [
            "그림 보기",
            "1.Rain Princesss, by Leonid Afremov",
            "2.La Muse, by Pablo Picasso",
            "3.Udnie by Francis Picabia",
            "4.Scream, by Edvard Munch",
            "5.The Great Wave off Kanagawa, by Hokusai",
            "6.The Shipwreck of the Minotaur, by J.M.W. Turner"
          ]
        }
      }
      res.send(obj)
    }
  }
});

module.exports = router;
