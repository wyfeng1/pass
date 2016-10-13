
$(function () {

    var user =  window.location.search.replace(/\?/,"");
            //console.log(user);
            $(".indexLogin1 b").html(user);
            if(user){
                $(".indexLogin").css({
                    "display":"none"
                })
                $(".indexLogin1").css({
                    "display":"block"
                })
            }
    // 缓存
    var $indexBannerPics = $(".indexBannerPics img");
    var $indexBannerRounds = $(".indexBannerRound");
    var $indexBannerPicsPre = $(".indexBannerPicsPre");
    var $indexBannerPicsNext = $(".indexBannerPicsNext");
    var index = 0;
    // var preindex = 0; // 不需要
    var timer = null;
    var len = $indexBannerPics.size();

    //左边背景色切换
    function Cor(){
        var color = new Array("#929293","#585859","#343334","#cecdd1","#2c204d");
        var i = Math.floor(Math.random()*5);
        //console.log(i)
        $(".indexLeftNav").css({
            "background-color":color[i]
        });
        
    }
        setInterval(Cor,3000);

    // 自动播放
    function autoPlay() {
        index++;
        if (index > len - 1) {
            index = 0;
            // preindex = len - 1;
        }
        changeImg();
        // preindex = index;
    }

    timer = setInterval(autoPlay,3000);

    // 做动画
    function changeImg () {
        // 前一张图淡出
        // $indexBannerPics.eq(preindex).stop(true).fadeOut(400);
        // 当前图淡入
        $indexBannerPics.eq(index).stop(true).fadeIn(400).siblings().stop(true).fadeOut(400);
        // 显示当前图的索引
        $indexBannerRounds.eq(index).addClass("indexBannerRoundHover").siblings().removeClass("indexBannerRoundHover");
    }

    // 添加小圆点划过事件
    $indexBannerRounds.mouseenter(function () {
        index = $(this).index();
        $indexBannerRounds.eq(index).css("cursor","pointer");
    });

    // 添加小圆点点击事件
    $indexBannerRounds.click(function () {
        // 清除定时器
        clearInterval(timer);
        index = $(this).index();
        // console.log(index);
        // 当前图淡入 其他图淡出
        // $indexBannerPics.eq(index).stop(true).fadeIn(400).siblings().stop(true).fadeOut(400);
        // 改变对应索引
        // $indexBannerRounds.eq(index).addClass("indexBannerRoundHover").siblings().removeClass("indexBannerRoundHover");
        changeImg(); //不能实现
        // preindex = index;
        // 重新开始定时器
        timer = setInterval(autoPlay,3000);
    });

    // 给左右按钮添加鼠标滑过事件
    $indexBannerPicsPre.mouseenter(function () {
        $indexBannerPicsPre.css("cursor","pointer").css("background-color","rgba(0,0,0,0.4)");
    }).mouseleave(function () {
        $indexBannerPicsPre.css("background-color","");
    });
    $indexBannerPicsNext.mouseenter(function () {
        $indexBannerPicsNext.css("cursor","pointer").css("background-color","rgba(0,0,0,0.4)");
    }).mouseleave(function () {
        $indexBannerPicsNext.css("background-color","");
    });

    // 给左右按钮添加点击事件
    $indexBannerPicsPre.click(function () {
        clearInterval(timer);
        index--;
        if (index < 0) {
            index = len - 1;
            // preindex = 0;
        }
        changeImg();
        // preindex = index;
        timer = setInterval(autoPlay,3000);
    });
    $indexBannerPicsNext.click(function () {
        clearInterval(timer);
        autoPlay();
        timer = setInterval(autoPlay,3000);
    });

    // 小米明星单品 ajax请求获取数据
 
    
    $.ajax({
        url:"JSON/indexXmStar.json",
        async:true,
        type:"get",
        success: function (res) {
             //console.log(res);
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                var index = i;
               // console.log(index)
                htmlStr += '<li class="indexImgItem"><a href="html/googsList.html"><img src="'
                        + res[i].picture + ' "/></a><h3 class="PicTitle">'
                        + res[i].production + '</h3><p class="intro">'
                        + res[i].intro + '</p><p class="price">'
                        + res[i].price +'</p></li>'
            }
            //<a href="html/detail.html?res[i]
            // console.log(htmlStr);
            $(".indexScrollImg").html(htmlStr);
        },
        error: function () {}
    });

    // 小米明星单品滚动轮播
    $(".indexScrollImgBox:eq(0)").scrollImg({
        indexScrollImgBoxSelector:".indexScrollImgBox:eq(0)",
        moreSelector:".indexScrollImgBox:eq(0) .more",
        prePageSelector:".more:eq(0) .prePage",
        nextPageSelector:".more:eq(0) .nextPage"
    });

 

    // 智能硬件 ajax请求获取数据
    $.ajax({
        url:"JSON/indexSmartHardWare.json",
        async:true,
        type:"get",
        success: function (res) {
            // console.log(res);
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                htmlStr += '<li class="indexSmartHardWareListsItem floatImg"><a href="html/googsList.html"><img src="'
                    + res[i].picture + ' "/></a><h3 class="PicTitle">'
                    + res[i].production + '</h3><p class="intro">'
                    + res[i].intro + '</p><p class="price">'
                    + res[i].price +'</p><div class="reviewcontent">'
                    + '<span class="reviewcontentIntro">物流超快，包装一打开，我就闻到了一缕口红的清香，陶醉...</span>'
                    +'<span class="reviewcontentFrom">来自于 XXX</span></div></li>';
            }
            // console.log(htmlStr);
            $(".indexSmartHardWareLists").html(htmlStr);
            var $indexSmartHardWareListsItem = $(".indexSmartHardWareListsItem");
            var $reviewcontent = $(".reviewcontent");
            // console.dir($indexSmartHardWareListsItem);
            for (var j = 0, leng = $indexSmartHardWareListsItem.size(); j < leng; j++) {
                // console.log($indexSmartHardWareListsItem.eq(j));
                // console.log(leng);
                $indexSmartHardWareListsItem.eq(j).hover(function () {
                    index = $(this).index();
                    $reviewcontent.eq(index).stop(true).animate({height:75},400);
                }, function () {
                    index = $(this).index();
                    $reviewcontent.eq(index).stop(true).animate({height:0},100);
                });
            }
        },
        error: function () {}
    });

    // 搭配1 ajax请求获取数据
    $.ajax({
        url:"JSON/indexmatch1.json",
        async:true,
        type:"get",
        success: function (res) {
            // console.log(res);
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                htmlStr += '<li class="indexSmartHardWareListsItem floatImg"><a href="html/googsList.html"><img src="'
                    + res[i].picture + ' "/></a><h3 class="PicTitle">'
                    + res[i].production + '</h3><p class="intro">'
                    + res[i].intro + '</p><p class="price">'
                    + res[i].price +'</p></li>';
            }
            // console.log(htmlStr);
            $(".indexBoxNavItemHover1").html(htmlStr);
        },
        error: function () {}
    });
    // 搭配2 ajax请求获取数据
    $.ajax({
        url:"JSON/indexmatch2.json",
        async:true,
        type:"get",
        success: function (res) {
            // console.log(res);
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                htmlStr += '<li class="indexSmartHardWareListsItem floatImg"><a href="html/googsList.html"><img src="'
                    + res[i].picture + ' "/></a><h3 class="PicTitle">'
                    + res[i].production + '</h3><p class="intro">'
                    + res[i].intro + '</p><p class="price">'
                    + res[i].price +'</p></li>';
            }
            // console.log(htmlStr);
            $(".indexBoxNavItemHover2").html(htmlStr);
        },
        error: function () {}
    });
    // 搭配3 ajax请求获取数据
    $.ajax({
        url:"JSON/indexmatch3.json",
        async:true,
        type:"get",
        success: function (res) {
            // console.log(res);
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                htmlStr += '<li class="indexSmartHardWareListsItem floatImg"><a href="html/googsList.html"><img src="'
                    + res[i].picture + ' "/></a><h3 class="PicTitle">'
                    + res[i].production + '</h3><p class="intro">'
                    + res[i].intro + '</p><p class="price">'
                    + res[i].price +'</p></li>';
            }
            // console.log(htmlStr);
            $(".indexBoxNavItemHover3").html(htmlStr);
        },
        error: function () {}
    });
    // 搭配4 ajax请求获取数据
    $.ajax({
        url:"JSON/indexmatch4.json",
        async:true,
        type:"get",
        success: function (res) {
            // console.log(res);
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                htmlStr += '<li class="indexSmartHardWareListsItem floatImg"><a href="html/googsList.html"><img src="'
                    + res[i].picture + ' "/></a><h3 class="PicTitle">'
                    + res[i].production + '</h3><p class="intro">'
                    + res[i].intro + '</p><p class="price">'
                    + res[i].price +'</p></li>';
            }
            // console.log(htmlStr);
            $(".indexBoxNavItemHover4").html(htmlStr);
        },
        error: function () {}
    });

    // 搭配
    $(".indexBox:eq(0) .indexBoxNavItem").changeTab({
        indexBoxNavItemSelector:".indexBox:eq(0) .indexBoxNav .indexBoxNavItem",
        indexBoxNavItemHoverSelector:".indexBox:eq(0) .indexBoxNav .indexBoxNavItem .indexBoxNavItemHover",
        indexBoxNavSelector:".indexBox:eq(0) .indexBoxNav"});
    // 配件
    $(".indexBox:eq(1) .indexBoxNavItem").changeTab({
        indexBoxNavItemSelector:".indexBox:eq(1) .indexBoxNav .indexBoxNavItem",
        indexBoxNavItemHoverSelector:".indexBox:eq(1) .indexBoxNav .indexBoxNavItem .indexBoxNavItemHover",
        indexBoxNavSelector:".indexBox:eq(1) .indexBoxNav"});
    // 周边
    $(".indexBox:eq(2) .indexBoxNavItem").changeTab({
        indexBoxNavItemSelector:".indexBox:eq(2) .indexBoxNav .indexBoxNavItem",
        indexBoxNavItemHoverSelector:".indexBox:eq(2) .indexBoxNav .indexBoxNavItem .indexBoxNavItemHover",
        indexBoxNavSelector:".indexBox:eq(2) .indexBoxNav"});

    // 为你推荐滚动轮播
    $(".indexScrollImgBox:eq(1)").scrollImg({
        indexScrollImgBoxSelector:".indexScrollImgBox:eq(1)",
        moreSelector:".indexScrollImgBox:eq(1) .more",
        prePageSelector:".more:eq(1) .prePage",
        nextPageSelector:".more:eq(1) .nextPage"});

    // 热评产品 ajax请求获取数据
    $.ajax({
        url:"JSON/indexHotReview.json",
        async:true,
        type:"get",
        success: function (res) {
            // console.log(res);
            // var arr = res.data;
            var htmlStr = "";
            for (var i = 0, len = res.length; i < len; i++) {
                htmlStr += '<li class="IndexHotReviewPicItem floatImg"><a class="indexHotReviewPicItemPic"><img src="'
                        + res[i].picture + '" /></a><p class="review">'
                        + res[i].intro + '</p><p class="from">'
                        + res[i].from + '</p><a href="#" class="productName">'
                        + res[i].production + '<span class="productPrice">'
                        + res[i].price + '</span></a></li>';
            }
            // console.log(htmlStr);
            $(".indexHotReviewPic").html(htmlStr);
        },
        error: function () {}
    });

    // 内容
    $(".lunboBox:eq(0)").changeImg({lunboBoxSelector:".lunboBox:eq(0)",
        lunboItemSelector:".lunboBox:eq(0) .lunbo .lunboItem",
        lunbopageSelector:".lunboBox:eq(0) .lunboRound .lunbopage",
        lunboprePageSelector:".lunboBox:eq(0) .lunboprePage",
        lunbonextPageSelector:".lunboBox:eq(0) .lunbonextPage"
    });
    $(".lunboBox:eq(1)").changeImg({lunboBoxSelector:".lunboBox:eq(1)",
        lunboItemSelector:".lunboBox:eq(1) .lunbo .lunboItem",
        lunbopageSelector:".lunboBox:eq(1) .lunboRound .lunbopage",
        lunboprePageSelector:".lunboBox:eq(1) .lunboprePage",
        lunbonextPageSelector:".lunboBox:eq(1) .lunbonextPage"
    });
    $(".lunboBox:eq(2)").changeImg({lunboBoxSelector:".lunboBox:eq(2)",
        lunboItemSelector:".lunboBox:eq(2) .lunbo .lunboItem",
        lunbopageSelector:".lunboBox:eq(2) .lunboRound .lunbopage",
        lunboprePageSelector:".lunboBox:eq(2) .lunboprePage",
        lunbonextPageSelector:".lunboBox:eq(2) .lunbonextPage"
    });
    $(".lunboBox:eq(3)").changeImg({lunboBoxSelector:".lunboBox:eq(3)",
        lunboItemSelector:".lunboBox:eq(3) .lunbo .lunboItem",
        lunbopageSelector:".lunboBox:eq(3) .lunboRound .lunbopage",
        lunboprePageSelector:".lunboBox:eq(3) .lunboprePage",
        lunbonextPageSelector:".lunboBox:eq(3) .lunbonextPage"
    });
});