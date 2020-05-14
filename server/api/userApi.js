let express = require('express');
let router = express.Router();
let mysqlConn = require('../mysqlConnect');
let $sql = require('../sqlMap');
let jsonWrite = require('../api/apiCommon').jsonWrite;
let sendError = require('../api/apiCommon').sendError;

const urlPrefix = "/user";

// 登录
router.post('/login', (req, res) => {
    let sql = $sql.user.loginCheck;
    let params = req.body;
    // console.log(params);
    mysqlConn(sql).then((data) => {
        // console.log(data);
        let isUserExists = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].account == params.account) {
                isUserExists = true;
                if (data[i].password == params.password) {
                    jsonWrite(res, null, 0, "登录成功", `${urlPrefix}/login`);
                } else {
                    jsonWrite(res, null, 1500, "密码有误，登录失败", `${urlPrefix}/login`);
                }
                break;
            }
        }
        if (!isUserExists) {
            jsonWrite(res, null, 1500, "用户不存在！", `${urlPrefix}/login`);
        }
    }).catch((err) => sendError(res, err, `${urlPrefix}/login`));
});

// 查询用户信息
router.get('/checkUser', (req, res) => {
    let sql = $sql.user.check;
    mysqlConn(sql).then((data) => {
        jsonWrite(res, data, 0, "查询成功", `${urlPrefix}/checkUser`);
    }).catch((err) => sendError(res, err, `${urlPrefix}/checkUser`));
});

module.exports = router;
