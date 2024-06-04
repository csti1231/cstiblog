//显示登录视图
function showGlobalGzhView() {
    document.body.style.overflow = 'hidden'
    var login_bg = document.querySelector(".global_gzh_bg");
    login_bg.style.display = "block";

    var title = document.querySelector(".global_gzh_container_title")
    var img = document.querySelector(".global_gzh_container_img_item")

    title.innerHTML = adInfo.content
    img.setAttribute('src',adInfo.url);

    var close = document.querySelector(".global_gzh_close");
    close.addEventListener("click", function() {
        login_bg.style.display = "none";
        document.body.style.overflow = 'visible'
        localStorage.setItem("last_show_gzh_v3", new Date().getTime())
    })
}

if(adInfo && adInfo.show){
    let lastShow = localStorage.getItem("last_show_gzh_v3")
    if (!lastShow) {
        //没有
        showGlobalGzhView()
    } else {
        let time = new Date().getTime()
        if (time - lastShow > 12 * 3600 * 1000) {
            showGlobalGzhView()
        }
    }
}

