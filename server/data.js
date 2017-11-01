/**
 * Created by chloe on 2017/5/24.
 */
var express = require('express');
var app = express();

var mysql = require('mysql');
//配置模块
var settings = require('./setting');
//连接数据库
var connection = mysql.createConnection(settings.db);
connection.connect();

//查询
var selectSQL = 'select * from message';
console.log(1111)

/*加载模块*/
var http = require('http');
var path = require('path');
/*创建服务*/
var app = express();
app.use(express.static(path.join(__dirname, 'dist')));
/*服务启动*/


/*app.use(express.static('dist'));*/
app.get('/', function(req, res){
    res.sendFile( 'D:/resumeWebsite/index.html' );
});

    //把搜索值输出
    app.all('/commentData', function(req, res,next) {
      //  res.send(rows);
        console.log("jsoncallback");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "x-requested-with,content-type");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        // res.header("Content-Type", "application/jsonp;charset=utf-8");
        //var data = { email: 'example@163.com', name: 'jaxu' };
        //res.send(JSON.stringify(arr));
        var arr=[];
        connection.query(selectSQL, function(err, rows) {
            if (err) throw err;
            arr=rows
            res.send(JSON.stringify(arr));
        })
    });

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.all('/postCommet', function(req, res,next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-requested-with,content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    console.log(req.method)
    if(req.method=="POST"){
        console.log("body==",req.body);
        var arr1=[];
        connection.query("insert into message(user,pwd,content) values('" + 22 + "'," + 22+ ",'" +req.body.content + "')", function (err, rows) {
            connection.query(selectSQL, function(err, rows) {
                if (err) throw err;
                 arr1=rows
                res.json(JSON.stringify(arr1));
            })
        })
    }else {
        res.sendStatus(200);
     //   next();
    }
});
/*app.all('/postCommet', function (req, res,next) {
   console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Access-Control-Allow-Headers", "accept, content-type");
    res.header("Content-Type", "application/json;charset=utf-8");
    var data = { email: 'example@163.com', name: 'jaxu' };
    res.send(JSON.stringify(data));
    next();
    //connection.query("insert into message(user,pwd,content) values('" + 11 + "'," + 11 + ",'" + 555 + "')", function (err, rows) {
    //
    //})
});*/
//关闭连接
//
var server=app.listen(86,function(){
    var host=server.address();
    console.log(host);
   // console.log("访问的地址是:http://%s:%s",host,post);
});