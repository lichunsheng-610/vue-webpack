let moment = require('moment');

module.exports = {
    jsonWrite: function (res, object, code, msg = "this is message", url) {
        console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")}：${url}_${msg}`); //node调试--输出到node
        if (typeof object === 'undefined') {
            res.json({
                data: null,
                code: '1500',
                msg: '操作失败'
            });
        } else {
            res.json({
                data: object,
                code: code,
                msg: msg
            });
        }
    },
    sendError: function (res, error, url) {
        this.jsonWrite(res, null, -1, `请求错误：${error}`, url);
    }
}
