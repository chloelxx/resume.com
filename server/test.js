/**
 * Created by chloe on 2017/11/1.
 */
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

var n = -1;// 初始状态为负数，表示还没开始读取
var ans = 0;
var cur_line = 0;
rl.on('line', function(line){ // javascript每行数据的回调接口
   var data=[],arr=[];
    arr=line.trim().split(" ")
    arr.map(function(item,index){
        data[index]=parseInt(item);
    })
    data.sort(function(a,b){
        return a-b;
    })
    var j=0,max=0,value=data[0];
    for(var i=0;i<data.length;i++){
        j=i+1;
        while(data[j]==data[j-1]){
            j++;
        }
        if(max<j-i){
            value=data[j-1];
            max=j-i;
        }
    }
    console.log(value);
});