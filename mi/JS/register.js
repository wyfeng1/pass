
var phone = document.getElementById("phone");
var phoneError = document.getElementById("phoneError");
var verify = document.getElementById("verification");
var verifyCode = document.getElementById("verificationCode");
var verifyError = document.getElementById("verificationError");
var psd = document.getElementById("psd");
var psdError = document.getElementById("psdError");
// 添加输入框失去焦点事件
verify.onblur = validverify;
psd.onblur = validPsd;
phone.onblur = validPhone;
verify.onfocus = function () {
    verifyError.style.display = "none";
}
psd.onfocus = function(){
    psdError.style.display = "none";
}
phone.onfocus = function(){
  phoneError.style.display = "none";
}
// 验证手机号
function validPhone(oPhone) {
    oPhone = phone.value;
    var reg = /^\d{11}$/;
    if (reg.test(phone.value)) {
        // 验证该手机号是否已经注册
        $.ajax({
            url:"http://10000phone.applinzi.com/HQNews/user/checkRegister.php",
            dataType:"json",
            type:"post",
            data:{username:oPhone},
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    return true;
                } else {
                    alert("用户已经注册！");
                    return false
                }
            },
            error: function () {}
        });
        return true;
    } else {
        phoneError.style.display = "block";
        return false;
    }
}
// 获取验证码
function getverify() {
    var verifications = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var verifyNum1 = Math.floor(Math.random() * 42);
    var verifyNum2 = Math.floor(Math.random() * 42);
    var verifyNum3 = Math.floor(Math.random() * 42);
    var verifyNum4 = Math.floor(Math.random() * 42);
    var verifyNum5 = Math.floor(Math.random() * 42);
    var verifyNum6 = Math.floor(Math.random() * 42);

    var verifyC = verifications[verifyNum1]
                + verifications[verifyNum2]
                + verifications[verifyNum3]
                + verifications[verifyNum4]
                + verifications[verifyNum5]
                + verifications[verifyNum6];
    verifyCode.innerHTML = verifyC;

    return verifyC;
    // console.log(verifyC);
    // console.log(verifyCode);
}
        function chColor()
        { 
        var color = new Array("red","blue","green","black","yellow","pink");
        var i =Math.floor(Math.random()*5);
         $("#verificationCode").css({
            "color":color[i]
         })
        }
        setInterval(chColor,500)
// 验证验证码
var verifyC = getverify();
function validverify() {
    if (verify.value == verifyC) {
        return true;
    } else {
        verifyError.style.display = "block";
    }
}
// 验证密码
function validPsd() {
    //console.log(psd.value.length)
    //console.log(psdError.style.display)
        if (psd.value.length < 6 || psd.value.length > 13) {
            //alert(1)
            psdError.style.display = "block";
            return false;
        } else {
            return true;
        }
    }


// 验证提交注册表单
$("#verificationBtn").click(function () {
    if (validPhone() && validverify() && validPsd()) {
          var User = $("input[type=tel]").val();
            var Psd = $("input[type=password]").val();
            tq(User,Psd);
       function tq(User,Psd) {
            $.ajax({
                url: 'http://datainfo.duapp.com/shopdata/userinfo.php?'+"status=register" + "&userID="+ User + "&password=" + Psd,
                type: 'POST',
                
            })
            .done(function(data) {
               // console.log(data)
                if(data==1){
                    alert("注册成功")
                    window.location="login.html"
                }else{
                    alert("用户已经注册！")
                }
            });
            
        };
      
    } else {
        alert("注册信息有误！");
    }
    return false;
});


