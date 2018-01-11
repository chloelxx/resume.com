/**
 * Created by chloe on 2017/10/23.
 */
    //判断是pc还是手机端
(function(){
    var ua=window.navigator.userAgent;
    var exg=/iphone|android/;
    if(exg.test(ua.toLowerCase())){
        $("#nav>div").css("width","100%");
        $("#nav>ul").css("width","100%");
        $(".programDesc").css("display","flex").css("display","-webkit-flex");
        $(".items").css("width","100%");
        $(".program").css("display","block");
        $(".list-img img").css("-webkit-filter"," brightness(0.3)").css("filter","brightness(0.3)");
        $("#loadMusic").removeClass("playBgm");
        $(".program>div").css("padding",0);
        $("#loadMusic").click(function(){
            console.log("click");
            var f=$("#bgm")[0].paused;
            if(!f){
                $(this)[0].src="img/musicOff.png";
                $("#bgm")[0].pause()
            }else{
                $(this)[0].src="img/musicOn.png";
                $("#bgm")[0].play();
            }
        })
    }else{
        $("#loadMusic").addClass("playBgm");
        $("#loadMusic").click(function(){
            console.log("click");
            if($(this).hasClass("playBgm")){
                $(this)[0].src="img/musicOff.png";
                $(this).css("animation","none");
                $("#bgm")[0].pause()
                $(this).removeClass("playBgm");
            }else{
                $(this)[0].src="img/musicOn.png";
                $(this).css("animation","myfirst 1s linear 0s infinite alternate");
                $("#bgm")[0].play();
                $(this).addClass("playBgm");
            }
        })
    }
})()
$(function() {
    var length = 2;
    $(".bg-img li:nth-child(2)").show();
    setInterval(function () {
        var index = Math.round(Math.random() * length);
        $("#part1 .bg-img li").eq(index).addClass("show").siblings().removeClass("show");
    },5000);
});
$("a").click(function () {
    $(this).addClass("active").parent().children().removeClass("active");
    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top+ "px"}, 500);
    return false;//不要这句会有点卡顿
});
(function (){
    //页面滚动
    var top1 = $("#aboutMe").offset().top-30;
    var top2 = $("#myWorks").offset().top-30;
    var top3 = $("#apply").offset().top-30;
    var top4 = $("#skill").offset().top- 30;
    var top5 = $("#contactMe").offset().top-30;

    var tops = [top1,top2,top3];
/*    function throttle(fn,time){
        var __self = fn, // 保存需要被延迟执行的函数引用
            timer, // 定时器
            firstTime = true; // 是否是第一次调用
        return function () {
            var args = arguments,
                __me = this;
            if ( firstTime ) { // 如果是第一次调用，不需延迟执行
                __self.apply(__me, args);
                return firstTime = false;
            }
            if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
                return false;
            }
            timer = setTimeout(function () { // 延迟一段时间执行
                clearTimeout(timer);
                timer = null;
                __self.apply(__me, args);
            }, time || 0 );
        };
    }*/
    function setActive(){
        //导航fixed
        var s = $(window).scrollTop()+$(window).height()/2;
        s > top1 ? $('#part2').addClass("fixed") : $('#part2').removeClass("fixed");
        //导航跟随滚动响应
        if((s>top1)&&(s<top2)){
            $("#menu li a").eq(0).addClass("active").parent().siblings().children().removeClass("active");
        }else if((s>top2)&&(s<top3)){
            $("#menu li a").eq(1).addClass("active").parent().siblings().children().removeClass("active");
        }else if((s>top3)&&(s<top4)){
            $("#menu li a").eq(2).addClass("active").parent().siblings().children().removeClass("active");
        }else if((s>top4)&&(s<top5)){
            $("#menu li a").eq(3).addClass("active").parent().siblings().children().removeClass("active");
        }else if((s>top5)){
            $("#menu li a").eq(4).addClass("active").parent().siblings().children().removeClass("active");
        }
    }
    $(window).scroll(setActive);
   // $(window).scroll(throttle(setActive,500));
})()
$(".playBgm").hover(function(){
    $(this).css("animation","none");
},function (){
    if($(this).hasClass("playBgm")) {
        $(this).css("animation", "myfirst 1s linear 0s infinite alternate");
    }
})
var vm=new Vue({
    el:"#note",
    data: {
        list:[],
        isMoreDate:true,
        offset:1,
    },
    created:function(){
        this.initGetData()
    },
    methods:{
        formatTime:function(time){
            console.log(time);
            var data=new Date(time*1000);
           return data.toLocaleString();
        },
        loadMoreCom:function (){
           this.initGetData();
        },
        initGetData:function(){
            $.ajax({
                url: "http://127.0.0.1:86/commentData?page="+this.offset,
                method: "GET",
                beforeSend: function(xhr) {
                    //  xhr.setRequestHeader("If-Modified-Since", "0");
                },
                error: function(responseTxt) {
                    console.log("get cors",responseTxt);
                },
                success: function(responseTxt) {
                    var data=JSON.parse(responseTxt);
                    if(data.length!=0){
                        vm.list=vm.list.concat(data);
                        vm.offset=vm.offset+1;
                    }else{
                        vm.isMoreDate=false;
                    }

                }
            })
        }
    }
})
function postComment(){
    var str= $("#comt").val();
    str=JSON.stringify({content:str});
    console.log(str);
    $.ajax({
        url: "http://127.0.0.1:86/postCommet",
        method: "POST",
        data:str,
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Content-Type","application/json;charset=utf-8");
        },
        error: function(data) {
            console.log("服务器暂为开启，请过两天留言");
        },
        success: function(responseTxt) {
            var data=JSON.parse(responseTxt);
            console.log("data:",data);
            vm.list.splice(0,0,data[0]);
        }
    })
}
