
// loginBox
var username = document.getElementById("username");
var psd = document.getElementById("psd");
var errorTxt = document.getElementById("errorTxt");
// console.log(username);
username.onfocus = function(){
   errorTxt.innerHTML = "";
}
psd.onfocus = function(){
   errorTxt.innerHTML = "";
}
function validUsername () {
    // var reg = /\d{11}/;// 表示字符串中只要出现连续的11位数字就是合法的
    var reg1 = /^\d{8}$/; // 表示开始和结束匹配相同的字符
    var reg2 = /(\.com|\.cn)$/;
    var reg3 = /^\d{11}$/;
    var indexOfAt = username.value.indexOf("@");

    if (reg1.test(username.value)
        || (reg2.test(username.value) && indexOfAt > 0 && indexOfAt < username.value.length)
        || reg3.test(username.value)) {
        return true;
    } else {
        errorTxt.innerHTML = "用户名输入有误！";
        username.style.border = "1px solid #ff6700";
        return false;
    }
}

function validPsd () {
    if (psd.value.length < 6 || psd.value.length > 13) {
        errorTxt.innerHTML = "您输入的密码有误！";
        psd.style.border = "1px solid #ff6700";
        return false;
    } else {
        return true;
    }
}

username.onblur = validUsername;
//console.log(validUsername)
psd.onblur = validPsd;
$("form").submit(function () {
     var User = $("input[type=text]").val();
           // console.log(User)
            var Psd = $("input[type=password]").val();
             //console.log(Psd)
            tp(User,Psd);
    if (validUsername() && validPsd()) {
       
        function tp(User,Psd) {
            $.ajax({
                url: 'http://datainfo.duapp.com/shopdata/userinfo.php?'+"status=login" + "&userID="+ User + "&password=" + Psd,
                type: 'POST',
                
            })
            .done(function(data) {
                //console.log(data)
                if(data==0){
                    alert("用户名不存在")
                }else if(data==2){
                    alert("用户名与密码不符")
                }else{
                    window.location="../index.html?"+User
                }
            });
            
        };
       
    } 
    return false;
});