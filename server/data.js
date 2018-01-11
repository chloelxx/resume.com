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

//url.parse 方法来解析 URL 中的参数
var url = require('url');

//查询
var offset=0,count=5;
var selectSQL = 'select  UNIX_TIMESTAMP(time) AS time,user,pwd,content from message order by time desc limit '+offset+','+count+'';
//console.log("sql:",selectSQL);
/*加载模块*/
var http = require('http');
var path = require('path');
/*创建服务*/
var app = express();
app.use(express.static(path.join("../"+__dirname, '/resumeWebsite')));
/*服务启动*/
var dir=__dirname.replace("server","");
app.use(express.static(dir));  //把文件的静态资源加到服务器中
//访问ip加端口是定向到的路径资源
app.get('/', function(req, res){
    offset=1;
   res.sendFile(dir+'/index.html' );
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
        var params=url.parse(req.url,true).query;
        console.log("params:",params);
        var arr=[];
        offset=params.page-1;
        var selSql = 'select  UNIX_TIMESTAMP(time) AS time,user,pwd,content from message order by time desc limit '+offset*count+','+count+'';
        connection.query(selSql, function(err, rows) {
            console.log("sql:",selSql);
            if (err) throw err;
            if(rows.length>0) {
                if(rows.length==count){
                    offset = offset + 1;
                }
                arr = rows;
                console.log("offset:", offset);
            }
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
        var selSql = 'select  UNIX_TIMESTAMP(time) AS time,user,pwd,content from message order by time desc limit 0,1';
        connection.query("insert into message(user,pwd,content) values('" + 22 + "'," + 22+ ",'" +req.body.content + "')", function (err, rows) {
                connection.query(selSql, function (err, rows) {
                    if (err) throw err;
                    arr1 = rows
                    res.json(JSON.stringify(arr1));
                })

        })
    }else {
        res.sendStatus(200);
        next();
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