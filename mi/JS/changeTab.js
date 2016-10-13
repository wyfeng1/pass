/**
 * Created by Administrator on 2016/9/22.
 */
$.fn.extend({
    changeTab: function (obj) {
        var index = 0;

        // 底部边框淡入淡出
        $(obj.indexBoxNavItemSelector).hover(function () {
            index = $(this).index();
            $(obj.indexBoxNavItemSelector).eq(index).css("color","#ff6700")
                .siblings().css("color","#333");
            $(obj.indexBoxNavItemHoverSelector).eq(index).addClass("indexBoxNavItemHoverFirst")
                .siblings().removeClass("indexBoxNavItemHoverFirst");
        }, function () {
            index = $(this).index();
            $(obj.indexBoxNavItemSelector).eq(index).css("color","#333")
                .siblings().css("color","#333");
            $(obj.indexBoxNavItemHoverSelector).eq(index).removeClass("indexBoxNavItemHoverFirst");
            $(obj.indexBoxNavSelector).mouseleave(function () {
                $(obj.indexBoxNavItemSelector).eq(index).css("color","#ff6700")
                    .siblings().css("color","#333");
                $(obj.indexBoxNavItemHoverSelector).eq(index).addClass("indexBoxNavItemHoverFirst");
            });
        });
    }

});