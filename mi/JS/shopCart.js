
var cookiearr = getAllCookie();
// console.dir(cookiearr);
//1.显示购物车
var htmlstr = "";
for(var i = 0, len = cookiearr.length; i < len; i ++) {
    var obj = cookiearr[i];
    //产生元素时先进行判断，个数是否为1
    var btn2Str = "";
    if(obj.count==1) {//不能再点击减号了
        btn2Str = '<button name="btn2" disabled>-</button>'
    }
    else {
        btn2Str = '<button name="btn2">-</button>';
    }
    htmlstr += '<li class="cartlist-item">'
            +  '<img src="'+obj.picture+ '">'
            +  '<p>'+obj.production+'</p>'
            +  '<b>'+obj.price+'</b>'
            +  '<div class="btnswrap">'
            +  '<button name="btn1">+</button>'
            +  '<input type="text" value="'+obj.count+' "/>'
            +  btn2Str
            +  '</div><div class="goodTotalItem">'
            +  parseInt(obj.count) * parseInt(obj.price)
            +  '元</div><a href="#" name="delete">移除</a></li>';
}
var list = document.getElementById("cartlist");
var amout = document.getElementById("amout");
// console.dir("cookiearr = " + cookiearr);
// console.log("htmlstr = " + htmlstr);
//显示在列表中
list.innerHTML = htmlstr;
// console.log("list = " + list.innerHTML);
//最开始时，第一次计算总价格
computing();
//计算总价格和数量,并显示
function computing() {
    var totalCount = 0;//总数量
    var totalAmount = 0;//总价格
    for(var i = 0, len = cookiearr.length; i< len; i++) {
        var obj = cookiearr[i];//是一个购物车商品对象
        totalCount += obj.count;
        totalAmount += parseInt(obj.count) * parseInt(obj.price);
    }
    //显示数量和金额
    amout.children[0].innerHTML = "共计"+totalCount+"件商品，总价为<b>"+ totalAmount +"元</b>";

}

//给列表添加点击事件，注意区分点击的到底是哪一个
list.onclick = function(event) {
    var e = event || window.event;
    var tar = e.target || e.srcElement;
    //根据元素的name属性值来区分到底点击的是谁?
    if(tar.getAttribute("name")=="delete") {//点击删除
        //点击删除，首先确定点击的是第几个li
        //从数组中删除数据，删除节点，从cookie删除，重新计算价格
        var li = tar.parentNode;
        var index = getIndexOf(li);//获取li是第几个
        //splice(index,num)从索引开始删除若干个，
        cookiearr.splice(index,1);//删除index对应的元素
        //从界面上移除 li
        list.removeChild(li);
        //从cookie中移除，把目前的数组写入cookie
        CookieUtil.saveCookie("cart",JSON.stringify(cookiearr));
        //重新计算价格
        computing();
    } else if(tar.getAttribute("name")=="btn1") {//点击 +号
        //1.让输入框数值+1
        var countElem = tar.nextElementSibling || tar.nextSibling;
        countElem.value = parseInt(countElem.value)+1;
        //2.让数组中对应的那个商品的数量+1
        var li = tar.parentNode.parentNode;
        var index = getIndexOf(li);//点击的是第几个
        //把对应商品的数量+1
        cookiearr[index].count++;
        //3.重新计算价格
        computing();
        //4.把改变写入到cookie
        CookieUtil.saveCookie("cart",JSON.stringify(cookiearr));
        //点击+号让 -号可以使用
        //-号按钮就是 input的下一个
        var btn2 = countElem.nextElementSibling || countElem.nextSibling;
        btn2.disabled = false;//让-号可以使用
    }
    else if(tar.getAttribute("name")=="btn2") {//点击-
        //1.让输入框值-1
        //能点击减号时，肯定数量是大于1的
        var countElem = tar.previousElementSibling || tar.previousSibling;
        countElem.value = parseInt(countElem.value)-1;
        //2.把数组中的对应信息count-1
        var li = tar.parentNode.parentNode;
        var index = getIndexOf(li);//获取当前点击的是第几个
        cookiearr[index].count--;
        //3.判断是否减到1，减到1就禁用
        if(cookiearr[index].count==1) {
            tar.disabled = true;//禁用减号按钮
        }
        //4.cookie中的数据
        CookieUtil.saveCookie("cart",JSON.stringify(cookiearr));
        //5.重新计算价格
        computing();

    }
};

//给输入框添加失去焦点事件
//输入范围 1~9999必需是数字
var reg = /^[1-9]\d{0,3}$/;
var inputs = list.getElementsByTagName("input");
for(var k in inputs) {
    inputs[k].onblur = function() {
        var li = this.parentNode.parentNode;
        var index = getIndexOf(li);
        //失去焦点时首先校验数据
        if(reg.test(this.value)) {//校验输入框的值
            //确定是哪个数据

            cookiearr[index].count = parseInt(this.value);
            //
        }
        else {//输入不合法，直接变为之前的值
            this.value = cookiearr[index].count;
        }
        //判断是否为1
        var btn2 = this.nextElementSibling || this.nextSibling;
        if(this.value=="1") {
            btn2.disabled = true;//
        }
        else {
            btn2.disabled = false;
        }
        computing();
        CookieUtil.saveCookie("cart",JSON.stringify(cookiearr));
    }
}


function getAllCookie() {
    var value = CookieUtil.getCookie("cart");
    if(!value) {
        return [];//之前没有存入任何购物车数据
    }
    return JSON.parse(value);//购物车在cookie中已存在
}


// 某个 li ,        [li0,....li19]
//获取li元素在同胞中的索引
function getIndexOf(li) {
    var lis = list.children; // ul的子元素
    // console.dir(lis);
    //注意： lis并不是以数组，而是一个对象，但是
    for(var i in lis) {
        if(lis[i]===li) {
            return i;//返回该元素的索引
        }
    }
    return -1;//没找到该li
}