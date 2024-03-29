    /*
     *setItem:保存到本地储存或cookie  参数：key => 键名  val => 键值  exp => 过期时间（默认24小时），单位为小时
     *getItem:获取本地储存或cookie  参数：key => 键名
     *removeItem:清除某一项本地储存或cookie  参数：key => 键名
     *clearAll:清除所有本地储存或cookie
     *getAll:获取所有本地储存或cookie => {key1: val1, key2: val2}
     *注意：setItem 和 getItem 的参数已经进行了JSON格式和对象格式的转换，使用时无需再转换！！！
     */

    function supportLocalStorage() {
        try { //看是否支持localStorage
            localStorage.setItem("vue", 1);
            localStorage.removeItem("vue");
            return true;
        } catch (e) {
            return false;
        }
    }

    function escapeCookie(value) {
        return String(value).replace(/[,;"\\=\s%]/g, function (character) {
            return encodeURIComponent(character);
        });
    }
    var ret = {};
    if (supportLocalStorage()) {
        var cookieID;
        ret.setItem = function (key, val, exp) {
            if (cookieID) {
                clearTimeout(cookieID);
                cookieID = null;
            }
            localStorage.setItem(key, JSON.stringify(val));
            exp = exp || 24;
            cookieID = setTimeout(function () { //模拟24小时过期时间
                localStorage.removeItem(key);
            }, exp * 1000 * 60 * 60);
        }
        ret.getItem = function (key) {
            return JSON.parse(localStorage.getItem(key));
        }
        ret.removeItem = function (key) {
            if (key == undefined || key == '')
                return false;
            if (this.getItem(key) === false)
                return true;
            localStorage.removeItem(key);
            return true;
        }
        ret.clearAll = function () {
            localStorage.clear();
        }
        ret.getAll = function () {
            return localStorage;
        }
    } else {
        ret.setItem = function (key, value, exp) {
            exp = exp || 24;
            var date = new Date(); //将date设置默认为24小时以后的时间 
            date.setTime(date.getTime() + exp * 1000 * 60 * 60);
            document.cookie = escapeCookie(key) + '=' + escapeCookie(JSON.stringify(value)) + ';expires=' + date.toGMTString();
        }
        ret.getItem = function (key) {
            var m = String(document.cookie).match(new RegExp('(?:^| )' + key + '(?:(?:=([^;]*))|;|$)')) || "";
            if ("" === m)
                return "";
            return JSON.parse(decodeURIComponent(m[1]));
        }
        ret.removeItem = function (key) {
            if (key == undefined || key == '')
                return false;
            if (this.getItem(key) === false)
                return true;
            var cookieX = key + '=;';
            cookieX += 'expires=Thu, 01-Jan-1970 00:00:01 GMT;';
            document.cookie = cookieX;
            return true;
        }
        ret.clearAll = function () {
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                for (var i = keys.length; i--;)
                    document.cookie = keys[i] + '=0;expires=Thu, 01-Jan-1970 00:00:01 GMT;';
            }
        }
        ret.getAll = function () {
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            let all = {};
            if (keys) {
                for (var i = keys.length; i--;)
                    all[keys[i]] = ret.getItem(keys[i]);
            }
            return all;
        }
    }
    export default ret;
