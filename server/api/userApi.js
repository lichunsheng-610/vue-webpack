let models = require('../db');
let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let $sql = require('../sqlMap');
let moment = require('moment');

// 连接数据库
let conn = mysql.createConnection(models.mysql);
conn.connect();

let jsonWrite = function (res, object, code, msg = "this is message", url) {
    console.log(`${url}_${msg}_${moment().format("YYYY-MM-DD HH:mm:ss")}`); //node调试--输出到node
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

// 登录
router.post('/login', (req, res) => {
    let sql = $sql.user.loginCheck;
    let params = req.body;
    // console.log(params);
    conn.query(sql, [params.account], function (err, result) {
        try {
            if (err) {
                console.log(err);
                return;
            }
            let ret = JSON.parse(JSON.stringify(result));
            if (ret) {
                let isUserExists = false;
                for (let i = 0; i < ret.length; i++) {
                    if (ret[i].account == params.account) {
                        isUserExists = true;
                        if (ret[i].password == params.password) {
                            jsonWrite(res, null, 0, "登录成功", '/login');
                        } else {
                            jsonWrite(res, null, 1500, "密码有误，登录失败", '/login');
                        }
                        break;
                    }
                }
                if (!isUserExists) {
                    jsonWrite(res, null, 1500, "用户不存在！", '/login');
                }
            }
        } catch (error) {
            console.log(error);
        }

    })
});

// 查询用户信息
router.get('/checkUser', (req, res) => {
    let sql = $sql.user.check;
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result, 0, "查询成功", '/checkUser');
        }
    })
});

module.exports = router;
