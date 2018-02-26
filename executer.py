import evaluate
import mysql.connector
import time
import wget

cnx = mysql.connector.connect(user='root', password='qkqh7083',
                              host='localhost',
                              database='kakaoapi')

cursor = cnx.cursor()
query = ("SELECT count(*) FROM imagelist")
cursor.execute(query)
imagenum = cursor.fetchall()[0][0]
while(1):
    cnx = mysql.connector.connect(user='root', password='qkqh7083',
                              host='localhost',
                              database='kakaoapi')
    cursor = cnx.cursor()
    query = ("SELECT count(*) FROM imagelist")
    cursor.execute(query)
    newnum=cursor.fetchall()[0][0]
    if(imagenum!=newnum):
        print("ok")
        query = ("select num,imagelist.userkey,upurl,downurl,date,style from imagelist join userstyle where imagelist.userkey = userstyle.userkey order by num desc limit "+str(newnum-imagenum))
        cursor.execute(query)
        for (num,userkey,upurl,downurl,date,style) in cursor:
            wget.download(upurl,out=userkey+'.jpg')
            evaluate.main('./'+style+'.ckpt', './'+userkey+'.jpg', './'+userkey+'out.jpg')
        imagenum = newnum
    else:
        time.sleep(1)
        cnx.close()