
$.fn.extend({
   changeImg: function (obj) {

      var index = 0;
      var preindex = 0;
      var len = $(obj.lunboItemSelector).size();

      // 图片向左移动
      function moveLeft() {
         if (index > len - 1) {
            index = len - 1;
         } else {
            // 上一张图左移移出
            $(obj.lunboItemSelector).eq(preindex).stop(true)
                .animate({left:-296});
            // 当前图左移移入
            $(obj.lunboItemSelector).eq(index).stop(true)
                .css({left:296}).animate({left:0});
            // 改变小圆点的样式
            $(obj.lunbopageSelector).eq(index)
                .css("border","2px solid #ff6700")
                .css("margin","10px").css("background","#ffffff")
                .siblings().css("border","0").css("margin","12px")
                .css("background","#e0e0e0");
         }
         preindex = index;
      }
      // 图片向右移动
      function  moveRight() {
         if (index < 0) {
            index = 0;
         } else {
            // 上一张图右移移出
            $(obj.lunboItemSelector).eq(preindex).stop(true)
                .animate({left:296});
            // 当前图右移进入
            $(obj.lunboItemSelector).eq(index).stop(true)
                .css({left:-296}).animate({left:0});
            // 小圆点的样式
            $(obj.lunbopageSelector).eq(index)
                .css("border","2px solid #ff6700")
                .css("margin","10px").css("background","#ffffff")
                .siblings().css("border","0").css("margin","12px")
                .css("background","#e0e0e0");
         }
         preindex = index;
      }

      // 添加鼠标划入事件 左右按钮淡入淡出
      $(obj.lunboBoxSelector).hover(function () {
         $(obj.lunboprePageSelector).stop(true).fadeIn(400).css("cursor","pointer");
         $(obj.lunbonextPageSelector).stop(true).fadeIn(400).css("cursor","pointer");
      }, function () {
         $(obj.lunboprePageSelector).stop(true).fadeOut(400).css("cursor","");
         $(obj.lunbonextPageSelector).stop(true).fadeOut(400).css("cursor","");
      });

      // 添加左右按钮点击事件
      $(obj.lunboprePageSelector).click(function () {
         index--;
         moveRight();
      });
      $(obj.lunbonextPageSelector).click(function () {
         index++;
         moveLeft();
      });

      // 给索引添加事件
      $(obj.lunbopageSelector).hover(
          function () {
             index = $(this).index();
             $(obj.lunbopageSelector).eq(index)
                 .css("background","#ff6700").css("border","0")
                 .css("margin","12px");
          },
          function () {
             index = $(this).index();
             $(obj.lunbopageSelector).eq(index).css("background","#e0e0e0");
          }
      );
      $(obj.lunbopageSelector).click(function () {
         index = $(this).index();
         if (preindex > index) {
            moveRight();
            $(obj.lunbopageSelector).eq(index).css("background","#ffffff");
         } else {
            moveLeft();
            $(obj.lunbopageSelector).eq(index).css("background","#ffffff");
         }
      })
   }
});