var codeTimer = null;
var codeTime = 60;
var codeResetTimer = null;
var codeResetTime = 60;
var currentState = 0 // 0 是正常 1 登录 2 注册 3 忘记密码

//显示登录视图
function showLoginView() {
    document.body.style.overflow = 'hidden'
    var login_bg = document.querySelector(".global_login_bg");
    login_bg.style.display = "block";

    var close = document.querySelector(".global_roll_login_close");
    close.addEventListener("click", function() {
        login_bg.style.display = "none";
        document.body.style.overflow = 'visible'
    })

    currentState = 1;

    var emailInput = document.querySelector("#login_email");
    var pswInput = document.querySelector("#login_psw");
    var emailLocal = getStorageData();
    if (emailLocal && emailLocal != '') {
        emailInput.value = emailLocal;
        //jiang
        pswInput.focus();
        pswInput.select();
    }
}

//显示注册视图
function showRegisterView() {
    document.body.style.overflow = 'hidden'
    var register_bg = document.querySelector(".global_register_bg");
    register_bg.style.display = "block";

    var close = document.querySelector(".global_roll_register_close");
    close.addEventListener("click", function() {
        register_bg.style.display = "none";
        document.body.style.overflow = 'visible'
    })

    currentState = 2;
}

//显示重置密码
function showForgetView() {
    document.body.style.overflow = 'hidden'
    var register_bg = document.querySelector(".global_forget_bg");
    register_bg.style.display = "block";

    var close = document.querySelector(".global_roll_forget_close");
    close.addEventListener("click", function() {
        register_bg.style.display = "none";
        document.body.style.overflow = 'visible'
    })

    currentState = 3;
}

function closeAll() {
    var login_bg = document.querySelector(".global_login_bg");
    var register_bg = document.querySelector(".global_register_bg");
    var forget_bg = document.querySelector(".global_forget_bg");
    login_bg.style.display = "none";
    register_bg.style.display = "none";
    forget_bg.style.display = "none";

    currentState = 0;
}

var icon_login = document.querySelector(".roll_header #icon_login");
if (icon_login != null)
    icon_login.addEventListener("click", function() {
        showLoginView();
    });

var icon_regist = document.querySelector(".roll_header #icon_regist");
if (icon_regist != null)
    icon_regist.addEventListener("click", function() {
        showRegisterView();
    });

var global_register = document.querySelector(".global_register_bg .global_login");
global_register.addEventListener("click", function() {
    closeAll();
    showLoginView();
});

var global_login = document.querySelector(".global_login_bg .global_register");
global_login.addEventListener("click", function() {
    closeAll();
    showRegisterView();
});

//忘记密码按钮
var global_forget_psw = document.querySelector(".global_forget_psw");
global_forget_psw.onclick = function() {
    closeAll();
    showForgetView();
}

var registerBtn = document.querySelector(".global_roll_register");
registerBtn.addEventListener("click", function() {
    regist();
})

var loginBtn = document.querySelector(".global_roll_login");
loginBtn.addEventListener("click", function() {
    login();
})

var resetBun = document.querySelector(".global_roll_forget");
resetBun.addEventListener("click", function() {
    reset();
})

var sendCodeBtn = document.querySelector(".global_roll_get_code");
sendCodeBtn.addEventListener("click", function() {
    sendCode();
})

var sendForgetCodeBtn = document.querySelector(".global_forget_roll_get_code");
sendForgetCodeBtn.addEventListener("click", function() {
    sendForgetCode();
})

function emailCheck(email) {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (reg.test(email)) {
        return true
    } else {
        return false
    }
}

function sendForgetCode() {
    var email = document.querySelector("#forget_email").value.trim();
    if (!email || !emailCheck(email)) {
        showTips("邮箱不合法")
        return
    }
    $.post(
        '/user/reset/getcode', {
            email: email
        },
        function(result) {
            showTips(result.msg)
            if (result.code == 1) {
                codeResetTime = 60;
                $(".global_forget_roll_get_code").attr("disabled", true).css("pointer-events", "none");
                if (codeResetTimer != null) {
                    clearInterval(codeResetTimer)
                }
                codeResetTimer = setInterval(() => {
                    codeResetTime--;
                    sendForgetCodeBtn.innerText = codeResetTime + "秒后重试"

                    if (codeResetTime <= 0) {
                        clearInterval(codeResetTimer)
                        $(".global_forget_roll_get_code").attr("disabled", false).css("pointer-events", "auto");
                        sendForgetCodeBtn.innerText = "获取验证码"
                    }
                }, 1000);
            }
        }
    );
}

//获取验证码
function sendCode() {
    var email = document.querySelector("#email").value.trim();
    if (!email || !emailCheck(email)) {
        showTips("邮箱不合法")
        return
    }
    $.post(
        '/user/register/getcode', {
            email: email
        },
        function(result) {
            showTips(result.msg)
            if (result.code == 1) {
                codeTime = 60;
                $(".global_roll_get_code").attr("disabled", true).css("pointer-events", "none");
                if (codeTimer != null) {
                    clearInterval(codeTimer)
                }
                codeTimer = setInterval(() => {
                    codeTime--;
                    sendCodeBtn.innerText = codeTime + "秒后重试"

                    if (codeTime <= 0) {
                        clearInterval(codeTimer)
                        $(".global_roll_get_code").attr("disabled", false).css("pointer-events", "auto");
                        sendCodeBtn.innerText = "获取验证码"
                    }
                }, 1000);
            }
        }
    );
}

function reset() {
    var email = document.querySelector("#forget_email").value.trim();
    var code = document.querySelector("#forget_code").value.trim();
    var psw = document.querySelector("#forget_psw").value.trim();
    if (!email || !emailCheck(email)) {
        showTips("邮箱不合法")
        return
    }
    if (!code || code.length != 6) {
        showTips("验证码不合法")
        return
    }
    if (!psw) {
        showTips("密码不合法")
        return
    }
    $.post(
        '/user/reset', {
            email: email,
            code: code,
            psw: psw,
        },
        function(result) {
            showTips(result.msg)
            if (result.code == 1) {
                closeAll();
                showLoginView();
            }
        }
    );
}

function login() {
    var email = document.querySelector("#login_email").value.trim();
    var psw = document.querySelector("#login_psw").value.trim();
    if (!email || !emailCheck(email)) {
        showTips("邮箱不合法")
        return
    }
    if (!psw) {
        showTips("密码不合法")
        return
    }

    $.post(
        '/user/login', {
            email: email,
            psw: psw
        },
        function(result) {
            showTips(result.msg)
            if (result.code == 1) {
                saveStorageData(email)

                closeAll();
                window.location.reload()
            }
        }
    );
}

function saveStorageData(data) {
    localStorage.setItem("user_email", data);
}

function getStorageData() {
    var data = localStorage.getItem("user_email");
    return data ? data : ""
}

function regist() {
    var nickname = document.querySelector("#nickname").value.trim();
    var email = document.querySelector("#email").value.trim();
    var code = document.querySelector("#code").value.trim();
    var psw = document.querySelector("#psw").value.trim();
    if (!(nickname && nickname.length <= 8 && nickname.length >= 2)) {
        showTips("昵称不合法")
        return
    }
    if (!email || !emailCheck(email)) {
        showTips("邮箱不合法")
        return
    }
    if (!code || code.length != 6) {
        showTips("验证码不合法")
        return
    }
    if (!psw) {
        showTips("密码不合法")
        return
    }
    var avatar = textToImage(nickname);
    $.post(
        '/user/register', {
            nickname: nickname,
            email: email,
            code: code,
            psw: psw,
            avatar: avatar
        },
        function(result) {
            showTips(result.msg)
            if (result.code == 1) {
                closeAll();
                showLoginView();
            }
        }
    );
}

document.onkeydown = function(e) { // 回车提交表单
    // 兼容FF和IE和Opera
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        if (currentState == 1) {
            login();
        } else if (currentState == 2) {
            regist();
        }
    }
}