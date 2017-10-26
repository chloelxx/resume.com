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
var selectSQL = 'select * from student';

var arr = [];
connection.query(selectSQL, function(err, rows) {
    if (err) throw err;
    for (var i = 0; i < rows.length; i++) {
        arr[i] = rows[i].name;
    }
    //res.send(rows);
    //把搜索值输出
    app.get('/jsonp', function(req, res) {
      //  res.send(rows);
      //  console.log("jsoncallback");
      //  res.header("Access-Control-Allow-Origin", "*");
      //  res.header("Access-Control-Allow-Headers", "X-Requested-With");
      //  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      //  res.header("X-Powered-By",' 3.2.1');
      //  res.header("Content-Type", "application/jsonp;charset=utf-8");
        var _callback = req.query.callback;
        console.log(req.query.callback);
        var _data = { email: 'example@163.com', name: 'jaxu' };
        res.type('text/javascript');
        res.send(_callback + '(' + JSON.stringify(rows) + ')');
        //res.jsonp("asaa");
    });
    //app.all('*', function(req, res, next) {
    //    res.header("Access-Control-Allow-Origin", "*");
    //    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    //    res.header("X-Powered-By",' 3.2.1');
    //    res.header("Content-Type", "application/json;charset=utf-8");
    //    res.send(rows);
    //    console.log(rows);
    //    next();
    //});

});


//var server = http.createServer(function(req, res) {
//    res.writeHeader(200,{
//        'content-type':'application/json',
//        'Access-Control-Allow-Origin' : '*',
//        'Access-Control-Request-Method':'POST,GET,OPTIONS',
//        'Access-Control-Request-Headers':'content-type'});
//    res.on('data',function(d){
//        console.log(d);
//    })
//    //var a={
//    //    'name':'test'
//    //};
//    var a=["name","chloe"];
//    console.log(a);
//    res.write(JSON.stringify(a));
//    $jsoncallback . "(" . $json_data . ")";
//    res.end();
//}).listen('8080');



//关闭连接
connection.end();
app.listen(8080);