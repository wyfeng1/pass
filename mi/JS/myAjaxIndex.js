
$.fn.extend({
    myAjaxIndex:function (obj) {
        $.ajax({
            url:"\"" + obj.url1 + "\"",
            async:true,
            type:"get",
            success: function (res) {
                // console.log(res);
                // var arr = res.data;
                var htmlStr = "";
                for (var i = 0, len = res.length; i < len; i++) {
                    htmlStr += '<li class="indexSmartHardWareListsItem floatImg"><img src="'
                        + res[i].picture + ' "/><h3 class="PicTitle">'
                        + res[i].production + '</h3><p class="intro">'
                        + res[i].intro + '</p><p class="price">'
                        + res[i].price +'</p><div class="reviewcontent">'
                        + '<span class="reviewcontentIntro">物流超快，包装一打开，我就闻到了一缕口红的清香，陶醉...</span>'
                        +'<span class="reviewcontentFrom">来自于 XXX</span></div></li>';
                }
                // console.log(htmlStr);
                $("\"" + obj.url2 + "\"").html(htmlStr);
                for (var j = 0, leng = $(obj.indexSmartHardWareListsItemSelector).size(); j < leng; j++) {
                    $(obj.indexSmartHardWareListsItemSelector).eq(j).hover(function () {
                        index = $(this).index();
                        $(obj.reviewcontentSelector).eq(index).stop(true).animate({height:75},400);
                    }, function () {
                        index = $(this).index();
                        $(obj.reviewcontentSelector).eq(index).stop(true).animate({height:0},400);
                    });
                }
            },
            error: function () {}
        });
    }
});