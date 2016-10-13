


$(function () {
    var $headerNavItemAs = $(".headerNavItemA");
    var index = 0;
    var $headerNav = $(".headerNav");
    var $aHoverLists = $(".aHoverList");
    var $searchText = $("#searchText");
    var $headerSearch = $("#headerSearch");
    var $searchBtn = $(".searchBtn");
    var $searchHotWords = $(".searchHotWords");
    var $searchResult = $("#searchResult");


    // 顶部 NAV鼠标划过事件
    $(".headerNav .headerNavItem").hover(function () {
        index = $(this).index();
        $headerNavItemAs.eq(index)
            .css("color","#ff6700");
        $headerNav.css("border-bottom","1px solid #e0e0e0");
        $aHoverLists.eq(index).css("display","block")
            .animate({height:201});

    }, function () {
        index = $(this).index();
        $headerNavItemAs.eq(index).css("color","#333333");
        $headerNav.css("border-bottom","0");
        $aHoverLists.eq(index).css("display","none")
            .animate({height:0});
    });

    // 输入框获得焦点
    $searchText.focus(function () {
        $searchHotWords.css("display","none");
        $headerSearch.css("border","1px solid #ff6700");
        $searchBtn.css("border-left","1px solid #ff6700");
        $searchResult.css("border","1px solid #ff6700")
            .css("border-top","0")
            .css("display","block");
    });
    // 输入框失去焦点
    $searchText.blur(function () {
        setTimeout(function () {
            $searchHotWords.css("display","block");
            $headerSearch.css("border","1px solid #e0e0e0");
            $searchBtn.css("border-left","1px solid #e0e0e0");
            $searchResult.css("border","1px solid #e0e0e0")
                .css("border-top","0")
                .css("display","none");
        },200);
    });

    // 键盘按键抬起事件
    /*$searchText.keyup(function () {
        //发起一个jsonp请求
        $.ajax({
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            dataType: "jsonp",//使用script标签来实现请求而不是xhr
            data: {wd: $("#wd").val()},
            jsonp:"cb",//修改回调函数参数名  callback= 需要  cb
            success: function (res) {
                //res从服务器获取到数据
                console.log(res);
            }
        });
    });
    $searchResultItems(function () {
        index = $(this).index();
        $searchResultItems.eq(index).onclick(function () {
            onload.href = "http://baidu.com";
        });
    })*/

    var searchText = document.getElementById("searchText");
    var list = document.getElementById("searchResult");
    searchText.onkeyup = function() {
        $.ajax({
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            data: {wd: this.value},
            dataType: "jsonp",
            jsonp: "cb",
            success: function (data) {
               // console.log(data);
                //获取到的数据是  data = {s:[]}
                var arr = data.s;//搜索结果在这个s属性中，是一个数组
               // console.log("arr = " + arr);
                var htmlstr = "";
                for(var i = 0, len = arr.length; i < len; i++) {
                    htmlstr += "<li>"+arr[i]+"</li>";
                }
                //将搜索结果显示出来
                list.innerHTML = htmlstr;
            }
        });
    };


    //添加点击事件，利用事件委托，加入事件到Ul上，避免li每次被覆盖之后没有事件
    list.onclick = function(event) {
        var e = event || window.event;
        //获取li,因为要获取li中的文本
        var li = e.target || e.srcElement;
        //js跳转,使用百度的页面，进行搜索
        window.location.href = "https://www.baidu.com/s?wd="+li.innerHTML;
    }
});