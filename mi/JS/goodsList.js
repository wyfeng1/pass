/**
 * Created by Administrator on 2016/9/23.
 */

$(function () {
    // goodList Ajax数据请求
    $.ajax({
        url:"../JSON/goodsList.json",
        async:true,
        type:"get",
        success: function (res) {
            // console.log(res);  // 正确
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                htmlStr += '<li class="goodItem floatImg"><div class="goodPicture"><img src="'
                        + res[i].picture + '" title="点击查看详情" /></div><p class="goodIntro">点击图片查看详情</p><p class="goodName">'
                        + res[i].production + '</p><p class="goodPrice">'
                        + res[i].price + '</p><button class="goodBtn">加入购物车</button></li>'
            }
            // console.log(htmlStr);
            $("#goodList").html(htmlStr);
             var offset = $("#Oimg").offset();
                $(".goodBtn").click(function(event){
                    var addcar = $(this);
                    var img = $(".goodPicture img").attr('src');
                    var flyer = $('<img class="u-flyer" src="'+img+'">');
                    flyer.fly({
                        start: {
                            left: event.pageX,
                            top: event.pageY
                        },
                        end: {
                            left: offset.left+10,
                            top: offset.top+10,
                            width: 0,
                            height: 0
                        },
                        onEnd: function(){
                            $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
                            }
                        
                    });
                });
                $("#Oimg").click(function(){
                    window.location="shopCart.html"
                });
            var goodList = document.getElementById("goodList");
            // var arr = null;
            goodList.onclick = function (event) {
                var e = event || window.event;
                var tar = e.target || e.srcElement;

                if (tar.nodeName.toLowerCase() == "button"){
                    var li = tar.parentNode;  //父节点
                    var index = getIndexOf(li); // 获取li的索引
                    var obj = res[index]; //获取被点击的商品的信息

                    // console.dir("li的索引：" + index); // 错误
                    //console.dir("arr = " + res); // 正确
                    //console.log("tar = " + tar); // 正确
                    // console.log("商品详情：" + obj); // 错误
                    addToCart(obj);
                } else if (tar.nodeName.toLowerCase() == "img") {
                    var li = tar.parentNode.parentNode;  //父节点
                    var index = getIndexOf(li); // 获取li的索引
                    var obj = res[index]; //获取被点击的商品的信息

                    // console.dir("li的索引：" + index); // 错误
                    //console.dir("arr = " + res); // 正确
                    //console.log("tar = " + tar); // 正确
                    // console.log("商品详情：" + obj); // 错误
                    window.location.href = "detail.html";
                }
            };

            function getIndexOf(li) {
                var lis = goodList.children;
                //console.log("商品列表：" + goodList); // 正确
                // console.dir("lis = " + lis); // 正确
                for (var i = 0,len = lis.length;i < len;i++){
                    if (lis[i] === li){
                       // console.log(i); // 错误
                        return i;
                    }
                }
                return -1;
            }

            function getAllCookie() {
                var value = CookieUtil.getCookie("cart");
                if (!value) {
                    return [];
                }
                return JSON.parse(value);
            }

            function addToCart(obj) {
                var cookiearr = getAllCookie();
                // console.log("cookiearr = " + cookiearr); // 空
                var ifExist = false;
                for (var i = 0, len = cookiearr.length; i < len; i++) {
                    if (cookiearr[i].production == obj.production) {
                        cookiearr[i].count++; // 没有count
                        ifExist = true;
                    }
                }
                if (ifExist == true) {

                } else {
                    obj.count = 1;
                    cookiearr.push(obj);
                }
                CookieUtil.saveCookie("cart",JSON.stringify(cookiearr));
            }
        },
        error: function () {}
    });

    // 为你推荐
    /*$(".indexScrollImgBox").scrollImg({
        indexScrollImgBoxSelector:".indexScrollImgBox",
        moreSelector:".indexBoxHeader .more",
        prePageSelector:".indexBoxHeader .more .prePage",
        nextPageSelector:".indexBoxHeader .more .nextPage"});
    $.ajax({
        url:"../JSON/goodsListTuijian.json",
        async:true,
        type:"get",
        success: function (res) {
            // console.log(res);
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                htmlStr += '<li class="indexImgItem"><img src="'
                    + res[i].picture + ' "/><h3 class="PicTitle">'
                    + res[i].production + '</h3><p class="intro">'
                    + res[i].intro + '</p><p class="price">'
                    + res[i].price +'</p></li>'
            }
            // console.log(htmlStr);
            $(".indexScrollImg").html(htmlStr);
        },
        error: function () {}
    });*/
    $.ajax({
        url: "../JSON/goodsListTuijian2.json",
        async: true,
        type: "get",
        success: function (res) {
            // console.log(res);
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                htmlStr += '<li class="indexImgItem"><img src="'
                    + res[i].picture + ' "/><h3 class="PicTitle">'
                    + res[i].production + '</h3><p class="intro">'
                    + res[i].intro + '</p><p class="price">'
                    + res[i].price + '</p></li>'
            }
            // console.log(htmlStr);
            $(".indexScrollImg").html(htmlStr);

            // 滚动轮播
            var $indexScrollImg = $(".indexScrollImg");
            // 小圆点
            $(".scrollPage").find("li").hover(function () {
                $(this).css({"background":"#ff6700","margin":"10px"});
            }, function () {
                $(this).css({"background":"#b0b0b0","margin":"10px"});
            }).click(function () {
                var index = $(this).index();
                var sL = 1266*index;
                $(this).css({"border":"2px solid #ff6700","background":"#fff","margin":"8px"})
                    .siblings().css({"border":"2px solid #ffffff","background":"#b0b0b0","margin":"10px"});
                $indexScrollImg.stop(true).animate({marginLeft:-sL},400);
            })

        },
        error: function () {
        }
    });


});