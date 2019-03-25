let models = require('../db');
let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let $sql = require('../sqlMap');

// 连接数据库
let conn = mysql.createConnection(models.mysql);
conn.connect();

let jsonWrite = function (res, object, code, msg = "this is message") {
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
};

// 查询用户密码接口
router.post('/login', (req, res) => {
    let sql = $sql.user.loginCheck;
    var params = req.body;
    // console.log(params);
    conn.query(sql, [params.account], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            if (result[0].password && result[0].password == params.password) {
                console.log("登录成功");
                jsonWrite(res, null, 0, "登录成功");
            } else {
                jsonWrite(res, null, 1500, "密码有误，登录失败");
            }
        }
    })
});

// 增加用户接口
router.get('/checkUser', (req, res) => {
    let sql = $sql.user.check;
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result, 0);
        }
    })
});

module.exports = router;
