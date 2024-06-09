
$(function () {
        var t = document.createElement("a"); t.href = document.referrer; var msgTitle = t.hostname; var name = t.hostname.split(".")[1]; if ("" !== document.referrer) { switch (name) { case 'bing': msgTitle = '必应搜索'; break; case 'baidu': msgTitle = '百度搜索'; break; case 'so': msgTitle = '360搜索'; break; case 'google': msgTitle = '谷歌搜索'; break; case 'sm': msgTitle = '神马搜索'; break; case 'sogou': msgTitle = '搜狗搜索'; break; default: msgTitle = t.hostname; } }; var time = (new Date()).getHours();
        var msg = '';
        23 < time || time <= 5 ? msg = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？" :
            5 < time && time <= 7 ? msg = "早上好！一日之计在于晨，美好的一天就要开始了！" :
                7 < time && time <= 11 ? msg = "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！" :
                    11 < time && time <= 14 ? msg = "中午了，工作了一个上午，现在是午餐时间！" :
                        14 < time && time <= 17 ? msg = "午后很容易犯困呢，今天的运动目标完成了吗？" :
                            17 < time && time <= 19 ? msg = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~" :
                                19 < time && time <= 21 ? msg = "晚上好，今天过得怎么样？" :
                                    21 < time && time <= 23 && (msg = "已经这么晚了呀，早点休息吧，晚安~");
        fetch('https://api.ipify.org/').then(response => response.text()).then(ip => { $.ajax({ type: "get", url: "https://api.gumengya.com/Api/UserInfo", data: { type: 'json' }, async: true, success: function (data) { layer.msg("Hi~ 来自" + data.data.location + '<br/>从' + msgTitle + '来的朋友！<br/>使用 ' + data.data.os + "<br/>" + data.data.browser + ' 访问本站！' + '<br/>' + msg + '<br/>您的IP地址是：' + ip);
         } });
function displayStyledIP() {console.log('%cIP地址：%c' + ip, 'background-color: cyan;font-size:50px;color: red;', 'font-size:47px;color: cyan; background-color: red; padding: 3px; border-radius: 3px;');}
displayStyledIP();
setInterval(displayStyledIP, 1500);
         }).catch(error => console.error('Error fetching IP:', error));
    });
  function printWithInterval() { setInterval(() => {console.log("%c     瀚           %c","background:cyan;;font-family:monospace;color:red; font-size:60px;text-align: center;");console.log('%c瀚 https://csti1231.github.io/free/%c', 'background: red; color: cyan; padding: 50px; border-radius: 3px; text-decoration: none;');console.log("%c       瀚         %c","background: #000000;;font-family:monospace;color:red; font-size:60px;text-align: center;");console.log('%c瀚 https://csti1231.github.io/free/%c', 'background: #000000; color: cyan; padding: 100px; border-radius: 3PX; text-decoration: none;'); console.log("%c         瀚       %c","background: #321D8B;;font-family:monospace;color:cyan; font-size:60px;text-align: center;");console.log('%c瀚 https://csti1231.github.io/free/%c', 'background: #321D8B; color: cyan; padding: 150px; border-radius: 3px; text-decoration: none;');console.log("%c         瀚       %c","background: red;;font-family:monospace;color:cyan; font-size:60px;text-align: center;");console.log('%c瀚 https://csti1231.github.io/free/%c', 'background: red; color: cyan; padding: 150px; border-radius: 3px; text-decoration: none;');console.log("%c       瀚         %c","background: cyan;;font-family:monospace;color:#000000; font-size:60px;text-align: center;");console.log('%c瀚 https://csti1231.github.io/free/%c', 'background: #000000; color: cyan; padding: 100px; border-radius: 3PX; text-decoration: none;');console.log("%c     瀚           %c","background: #321D8B;;font-family:monospace;color:cyan; font-size:60px;text-align: center;");console.log('%c瀚 https://csti1231.github.io/free/%c', 'background: #321D8B; color: cyan; padding: 50px; border-radius: 3px; text-decoration: none;');}, 1500); } printWithInterval();


//   <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
//   <script async src="https://jsd.cdn.zzko.cn/gh/instantpage/instant.page@5.1.1/instant.page.js"
//       type="module"></script>
//   <script src="https://cdn.bootcdn.net/ajax/libs/layer/3.5.1/layer.js" type="text/javascript"
//       charset="utf-8"></script>
//       <script src="./quanju.js"></script>


//       <script src="https://cdn.staticfile.net/jquery/3.7.1/jquery.min.js"></script>
// <div data-fadeOutAutoplay id="xf-MusicPlayer" data-songList="10139922632" data-random="true"
//     data-cdnName="https://player.xfyun.club/js" data-themeColor="xf-girlPink"></div>
// <script src="https://player.xfyun.club/js/xf-MusicPlayer/js/xf-MusicPlayer.min.js"></script>