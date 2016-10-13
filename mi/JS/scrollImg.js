
$.fn.extend({
    scrollImg: function (obj) {
        var scrollTimer = null;
        // console.log(obj);
        // console.log(obj.prePageSelector);
            //console.log(obj)

        // 横向轮播
        function scrollAutoPlay() {
            var scrollLeftTimer = setTimeout(scrollLeftPlay,1000);
            var scrollRightTimer = setTimeout(scrollRightPlay,5000);
        }
        // 向左运动
        function scrollLeftPlay() {
            $(obj.indexScrollImgBoxSelector).stop(true).animate({scrollLeft:1226},1000);
        }
        function scrollRightPlay() {
            $(obj.indexScrollImgBoxSelector).stop(true).animate({scrollLeft:0},1000);
        }
        scrollTimer = setInterval(scrollAutoPlay,8000);
        // 给 more 添加鼠标滑过事件
        $(obj.moreSelector).hover(function () {
            // 清除定时器
            clearInterval(scrollTimer);
        }, function () {
            scrollTimer = setInterval(scrollAutoPlay,8000);
        });
        // 添加左右按钮点击事件
        $(obj.prePageSelector).click(function () {
            // console.log(this);
            scrollRightPlay();
        });
        $(obj.nextPageSelector).click(function () {
            // console.log(this);
            scrollLeftPlay();
        });
    }
});